async (page) => {
  const base = 'http://127.0.0.1:3002';
  const results = [], errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const captureWidths = [1440, 390];
  const views = [
    ['Discovery', null], ['Messages', null], ['Coordination', null],
    ['Failure & election', '1. Primary lost'], ['Failure & election', '2. Election'], ['Failure & election', '3. New primary'],
  ];
  for (const width of [1440, 390, 320, 820, 1024]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    for (const [name, route] of [['home', '/'], ['projects', '/projects'], ['case', '/projects/distributed-chat-system']]) {
      const response = await page.goto(base + route);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      const figure = page.locator('.chat-architecture');
      const states = [];
      if (captureWidths.includes(width)) await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      for (const [label, stage] of views) {
        await figure.getByRole('group', { name: 'Architecture view', exact: true }).getByRole('button', { name: label, exact: true }).click();
        if (stage) await figure.getByRole('group', { name: 'Election sequence', exact: true }).getByRole('button', { name: stage, exact: true }).click();
        await page.mouse.move(1, 1);
        await figure.locator('button:focus').evaluateAll(nodes => nodes.forEach(node => node.blur()));
        const state = await figure.evaluate(element => {
          const map = [...element.querySelectorAll('.chat-map')].find(svg => getComputedStyle(svg).display !== 'none');
          const box = map.getBoundingClientRect();
          const nodes = [...map.querySelectorAll('.chat-node')];
          const nodeRect = node => node?.querySelector('rect');
          const bounds = rect => rect ? { x: +rect.getAttribute('x'), y: +rect.getAttribute('y'), w: +rect.getAttribute('width'), h: +rect.getAttribute('height') } : null;
          const touches = (point, node) => {
            const r = bounds(nodeRect(node));
            return r && point.x >= r.x - 2 && point.x <= r.x + r.w + 2 && point.y >= r.y - 2 && point.y <= r.y + r.h + 2 && Math.min(Math.abs(point.x - r.x), Math.abs(point.x - r.x - r.w), Math.abs(point.y - r.y), Math.abs(point.y - r.y - r.h)) <= 2;
          };
          const connections = [];
          const checkConnection = (selector, from, to) => {
            const path = map.querySelector(selector);
            const correct = !!path && touches(path.getPointAtLength(0), from) && touches(path.getPointAtLength(path.getTotalLength()), to) && getComputedStyle(path).markerEnd.startsWith('url(');
            connections.push({ selector, correct: !!correct });
          };
          const flow = element.dataset.flow;
          const activePaths = [...map.querySelectorAll('[data-path].is-active')].map(node => node.dataset.path);
          const controlNodes = [...map.querySelectorAll('.chat-control-node')];
          const primary = controlNodes[0], replicas = controlNodes[1];
          const chats = [...map.querySelectorAll('.chat-peer-node')];
          const clients = [...map.querySelectorAll('.chat-client-node')];
          let rolesCorrect = true;
          if (flow === 'discovery') {
            checkConnection('[data-message="lookup"]', clients[0], primary);
            checkConnection('[data-message="host-reply"]', primary, clients[0]);
            checkConnection('[data-path="client-chat"]', clients[0], chats[0]);
            rolesCorrect = !replicas.classList.contains('is-active') && !activePaths.some(path => path.startsWith('chat-'));
          } else if (flow === 'messages') {
            checkConnection('[data-path="chat-send"]', clients[0], chats[0]);
            checkConnection('[data-path="chat-echo"]', chats[0], clients[0]);
            checkConnection('[data-path="chat-forward"] path:nth-child(1)', chats[0], chats[1]);
            checkConnection('[data-path="chat-forward"] path:nth-child(2)', chats[1], chats[2]);
            checkConnection('[data-path="chat-forward"] path:nth-child(3)', chats[2], chats[0]);
            checkConnection('[data-path="chat-forward"] path:nth-child(4)', chats[2], clients[1]);
            rolesCorrect = chats.map(node => node.dataset.pid).join(',') === '10,20,30' && !activePaths.some(path => /registry|discovery/.test(path));
          } else if (flow === 'coordination') {
            checkConnection('[data-path="registry-update"]', primary, replicas);
            checkConnection('[data-path="registry-ack"]', replicas, primary);
            checkConnection('[data-path="registry-refresh"]', replicas, primary);
            checkConnection('[data-path="server-registration"]', chats[2], primary);
            rolesCorrect = map.querySelector('[data-path="registry-update"]').dataset.event === map.querySelector('[data-path="registry-ack"]').dataset.event && chats[2].dataset.pid === 'pending' && !activePaths.some(path => path.startsWith('chat-'));
          } else {
            const low = nodes.find(node => node.dataset.pid === '2');
            const high = nodes.find(node => node.dataset.pid === '3');
            const old = nodes.find(node => node.dataset.pid === '1');
            rolesCorrect = old.dataset.role === 'unavailable' && !!old.querySelector('.chat-failure-mark') && !chats.length && !clients.length;
            if (map.dataset.electionStage === 'election') {
              checkConnection('[data-path="election-challenge"]', low, high);
              checkConnection('[data-path="bully-reply"]', high, low);
              rolesCorrect &&= low.dataset.role === 'replica' && high.dataset.role === 'replica';
            } else if (map.dataset.electionStage === 'leader') {
              checkConnection('[data-path="leader-announcement"]', high, low);
              checkConnection('[data-path="replica-register"]', low, high);
              checkConnection('[data-path="replica-records"]', high, low);
              rolesCorrect &&= low.dataset.role === 'replica' && high.dataset.role === 'primary' && high.textContent.includes('Primary');
            } else rolesCorrect &&= !!map.querySelector('[data-path="primary-lost"]') && !activePaths.length;
          }
          const labels = [...map.querySelectorAll('text')].map(text => ({ text: text.textContent, box: text.getBoundingClientRect(), node: text.closest('.chat-node'), px: parseFloat(getComputedStyle(text).fontSize) * box.width / map.viewBox.baseVal.width }));
          const outside = labels.filter(label => label.box.left < box.left - 1 || label.box.right > box.right + 1).map(label => label.text);
          const clippedNodeText = nodes.flatMap(node => {
            const rect = nodeRect(node).getBoundingClientRect();
            return [...node.querySelectorAll('text')].filter(text => {
              const box = text.getBoundingClientRect();
              return box.left < rect.left - 1 || box.right > rect.right + 1 || box.top < rect.top - 1 || box.bottom > rect.bottom + 1;
            }).map(text => text.textContent);
          });
          const collisions = [];
          for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) {
            const a = labels[i], b = labels[j];
            if (a.node && a.node === b.node) continue;
            if (Math.min(a.box.right, b.box.right) - Math.max(a.box.left, b.box.left) > 3 && Math.min(a.box.bottom, b.box.bottom) - Math.max(a.box.top, b.box.top) > 3) collisions.push([a.text, b.text]);
          }
          const controls = element.querySelector('.chat-flow-controls');
          const activeControl = controls.querySelector('[aria-pressed="true"]');
          return { flow, stage: map.dataset.electionStage || null, activePaths, connections, rolesCorrect, outside, clippedNodeText, collisions, minimumTextPx: Math.min(...labels.map(label => label.px)), title: element.querySelector('.chat-flow-title').textContent, pressedCount: controls.querySelectorAll('[aria-pressed="true"]').length, selectedControl: activeControl.textContent, diagramTitle: element.querySelector('.chat-figure-heading > p').textContent };
        });
        let violations = [];
        if (name === 'case' && captureWidths.includes(width)) {
          violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
          const clip = await figure.evaluate(element => { const r = element.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }; });
          await page.screenshot({ path: `output/playwright/irc-hat-audit/architecture-${state.stage || state.flow}-${width}.png`, fullPage: true, clip });
        }
        states.push({ label, ...state, violations });
      }
      await figure.getByRole('group', { name: 'Architecture view', exact: true }).getByRole('button', { name: 'Discovery', exact: true }).focus();
      await page.keyboard.press('Space');
      const spaceWorks = await figure.getAttribute('data-flow') === 'discovery';
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const keyboardWorks = spaceWorks && await figure.getAttribute('data-flow') === 'messages';
      await figure.getByRole('group', { name: 'Architecture view', exact: true }).getByRole('button', { name: 'Failure & election', exact: true }).click();
      await figure.getByRole('button', { name: '1. Primary lost', exact: true }).focus();
      await page.keyboard.press('Space');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const sequenceKeyboardWorks = await figure.locator('.chat-map:visible').getAttribute('data-election-stage') === 'election';
      await figure.getByRole('group', { name: 'Architecture view', exact: true }).getByRole('button', { name: 'Messages', exact: true }).click();
      await figure.locator('button:focus').evaluateAll(nodes => nodes.forEach(node => node.blur()));
      await page.mouse.move(1, 1);
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1Count: document.querySelectorAll('h1').length,
        duplicateIds: [...document.querySelectorAll('[id]')].map(node => node.id).filter((id, index, ids) => ids.indexOf(id) !== index),
        brokenAnchors: [...document.querySelectorAll('.case-toc a')].filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash),
        clippedUI: [...document.querySelectorAll('.chat-flow-controls, .chat-election-controls, .chat-flow-explanation, .chat-case-body')].filter(node => node.scrollWidth > Math.ceil(node.getBoundingClientRect().width) + 1).length,
      }));
      const content = await page.locator('main').innerText();
      const metadata = await page.evaluate(() => ({ title: document.title, description: document.querySelector('meta[name="description"]')?.content, canonical: document.querySelector('link[rel="canonical"]')?.href }));
      const copyChecks = {
        projectName: content.includes('Distributed Chat System'),
        initialHistory: name !== 'case' || content.includes('Initial registration also requests recent history.'),
        trackedScope: name !== 'case' || content.includes('Client-count updates and periodic record refreshes use separate, untracked update paths.'),
        storageRoles: name !== 'case' || content.includes('SHA-256 hashes') && content.includes('selects recent IDs'),
        tools: name !== 'case' || ['Tools & Technologies', 'Jackson', 'org.json', 'Docker Compose', 'Gradle'].every(term => content.includes(term)),
        metadata: name !== 'case' || metadata.description.includes('PID-based gossip') && metadata.canonical.endsWith('/projects/distributed-chat-system'),
      };
      let violations = [];
      if (captureWidths.includes(width)) {
        if (name !== 'case') violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
        if (name === 'home') { await page.locator('.personal-note').scrollIntoViewIfNeeded(); await page.locator('.personal-note img').evaluate(img => img.decode()); }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: `output/playwright/irc-hat-audit/${name}-${width}.png`, fullPage: true });
        const feature = name === 'home' ? page.locator('.v3-chat-project') : name === 'projects' ? page.locator('.collection-project').first() : null;
        if (feature) {
          const clip = await feature.evaluate(element => { const r = element.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }; });
          await page.screenshot({ path: `output/playwright/irc-hat-audit/${name}-feature-${width}.png`, fullPage: true, clip });
        }
      }
      results.push({ route, width, status: response.status(), states, keyboardWorks, sequenceKeyboardWorks, layout, copyChecks, metadata, violations });
    }
  }
  await page.goto(base + '/projects');
  await page.getByRole('button', { name: 'Distributed', exact: true }).click();
  const filterWorks = await page.locator('.collection-project').count() === 1;
  await page.getByRole('link', { name: 'Explore project', exact: true }).click();
  await page.waitForURL(base + '/projects/distributed-chat-system');
  const navigationWorks = page.url().endsWith('/projects/distributed-chat-system');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const figure = page.locator('.chat-architecture');
  await figure.getByRole('button', { name: 'Failure & election', exact: true }).click();
  await figure.getByRole('button', { name: '3. New primary', exact: true }).click();
  const reducedMotionWorks = await figure.locator('.chat-map:visible [data-pid="3"]').getAttribute('data-role') === 'primary';
  const context = await page.context().browser().newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto(base + '/projects/distributed-chat-system');
  const ssrWorks = await staticPage.locator('h1').innerText() === 'Distributed Chat System' && await staticPage.locator('#networking').isVisible() && await staticPage.locator('.chat-architecture').getAttribute('data-flow') === 'messages';
  await context.close();
  const pass = !errors.length && filterWorks && navigationWorks && reducedMotionWorks && ssrWorks && results.every(result => result.status === 200 && result.keyboardWorks && result.sequenceKeyboardWorks && !result.layout.overflow && !result.layout.duplicateIds.length && !result.layout.brokenAnchors.length && !result.layout.clippedUI && result.layout.h1Count === 1 && Object.values(result.copyChecks).every(Boolean) && !result.violations.length && result.states.every(state => state.diagramTitle === 'Distributed Chat System' && state.pressedCount === 1 && state.selectedControl === state.label && state.rolesCorrect && state.connections.every(c => c.correct) && !state.outside.length && !state.clippedNodeText.length && !state.collisions.length && state.minimumTextPx >= 11.9 && !state.violations.length));
  return { pass, results, errors, filterWorks, navigationWorks, reducedMotionWorks, ssrWorks };
}
