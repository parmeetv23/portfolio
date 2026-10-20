async (page) => {
  const base = 'http://127.0.0.1:3002';
  const results = [], errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const flows = ['Discovery', 'Messages', 'Coordination'];
  const screenshots = new Set([390, 1440]);
  for (const width of [1440, 390, 320, 820, 1024]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    for (const [name, route] of [['home', '/'], ['projects', '/projects'], ['case', '/projects/distributed-chat-system']]) {
      const response = await page.goto(base + route);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      const figure = page.locator('.chat-architecture');
      await figure.scrollIntoViewIfNeeded();
      const flowResults = [];
      for (const label of flows) {
        const button = figure.getByRole('button', { name: label, exact: true });
        await button.click();
        await page.mouse.move(1, 1);
        await button.blur();
        const expected = label.toLowerCase();
        const state = await figure.evaluate((element, active) => {
          const map = [...element.querySelectorAll('.chat-map')].find(node => getComputedStyle(node).display !== 'none');
          const box = map.getBoundingClientRect();
          const labels = [...map.querySelectorAll('text')].map(text => {
            const rect = text.getBoundingClientRect();
            return { text: text.textContent, outside: rect.left < box.left - 1 || rect.right > box.right + 1, font: parseFloat(getComputedStyle(text).fontSize) * box.width / map.viewBox.baseVal.width };
          });
          const activePaths = [...map.querySelectorAll('[data-path].is-active')].map(node => node.dataset.path);
          const client = map.querySelector('.chat-client-node rect');
          const returnPath = map.querySelector('[data-path="discovery"] path:last-child').getAttribute('d');
          const replyTargetsClient = returnPath.endsWith(`H${client.getAttribute('x')}`);
          const clippedNodeLabels = [...map.querySelectorAll('.chat-node')].flatMap(node => {
            const rect = node.querySelector('rect').getBoundingClientRect();
            return [...node.querySelectorAll('text')].filter(text => {
              const box = text.getBoundingClientRect();
              return box.left < rect.left - 1 || box.right > rect.right + 1;
            }).map(text => text.textContent);
          });
          const buttons = [...element.querySelectorAll('button')];
          return {
            flow: element.dataset.flow,
            pressed: buttons.filter(node => node.getAttribute('aria-pressed') === 'true').length,
            correctSelection: buttons.find(node => node.getAttribute('aria-pressed') === 'true').textContent.toLowerCase() === active,
            activePaths,
            pathsCorrect: active === 'messages' ? activePaths.includes('chat') && !activePaths.includes('registry') && !activePaths.includes('discovery')
              : active === 'discovery' ? activePaths.includes('discovery') && activePaths.includes('client-chat') && !activePaths.includes('chat')
              : activePaths.includes('registry') && activePaths.includes('heartbeat') && !activePaths.includes('chat'),
            outsideLabels: labels.filter(label => label.outside).map(label => label.text),
            clippedNodeLabels, replyTargetsClient,
            smallestLabelPx: Math.min(...labels.map(label => label.font)),
            title: element.querySelector('.chat-flow-title').textContent,
          };
        }, expected);
        flowResults.push({ label, ...state });
        if (name === 'case' && screenshots.has(width)) {
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
          const clip = await figure.evaluate(element => {
            const box = element.getBoundingClientRect();
            return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height };
          });
          await page.screenshot({ path: `output/playwright/irc-hat/architecture-${expected}-${width}.png`, fullPage: true, clip });
        }
      }
      // Native buttons remain reachable by Tab and activate with Space / Enter.
      await figure.getByRole('button', { name: 'Discovery', exact: true }).focus();
      await page.keyboard.press('Space');
      const spaceWorks = await figure.getAttribute('data-flow') === 'discovery';
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const keyboardWorks = spaceWorks && await figure.getAttribute('data-flow') === 'messages';
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1Count: document.querySelectorAll('h1').length,
        duplicateIds: [...document.querySelectorAll('[id]')].map(node => node.id).filter((id, index, ids) => ids.indexOf(id) !== index),
        brokenAnchors: [...document.querySelectorAll('.case-toc a')].filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash),
        clippedCopy: [...document.querySelectorAll('.chat-flow-explanation, .chat-flow-controls, .chat-case-body')].filter(node => node.scrollWidth > Math.ceil(node.getBoundingClientRect().width) + 1).length,
      }));
      const main = await page.locator('main').innerText();
      const metadata = await page.evaluate(() => ({ title: document.title, description: document.querySelector('meta[name="description"]')?.content, canonical: document.querySelector('link[rel="canonical"]')?.href, ogTitle: document.querySelector('meta[property="og:title"]')?.content }));
      const checks = {
        named: main.includes('Distributed Chat System'),
        legacyHeadingRemoved: !main.includes('A chat system across processes'),
        conciseCase: name !== 'case' || !/What I owned end-to-end|Outcomes & reflections|Tradeoffs & limitations/.test(main),
        tools: name !== 'case' || main.includes('Tools & Technologies'),
        caseMetadata: name !== 'case' || metadata.title.includes('IRC-HAT') && metadata.ogTitle.includes('Distributed Chat System') && metadata.canonical.endsWith('/projects/distributed-chat-system'),
        keyboardWorks,
      };
      if (screenshots.has(width)) {
        await figure.getByRole('button', { name: 'Messages', exact: true }).blur();
        await page.mouse.move(1, 1);
        if (name === 'home') {
          await page.locator('.personal-note').scrollIntoViewIfNeeded();
          await page.locator('.personal-note img').evaluate(image => image.decode());
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: `output/playwright/irc-hat/${name}-${width}.png`, fullPage: true });
        const feature = name === 'home' ? page.locator('.v3-chat-project') : name === 'projects' ? page.locator('.collection-project').first() : null;
        if (feature) {
          const clip = await feature.evaluate(element => {
            const box = element.getBoundingClientRect();
            return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height };
          });
          await page.screenshot({ path: `output/playwright/irc-hat/${name}-feature-${width}.png`, fullPage: true, clip });
        }
      }
      let violations = [];
      if (screenshots.has(width)) {
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
        violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })));
      }
      results.push({ width, route, status: response.status(), layout, checks, flowResults, metadata, violations });
    }
  }
  // Confirm filtering retains the interactive project and the case-study link.
  await page.goto(base + '/projects');
  await page.getByRole('button', { name: 'Distributed', exact: true }).click();
  const filterWorks = await page.locator('.collection-project').count() === 1 && await page.locator('.collection-project h2').innerText() === 'Distributed Chat System';
  await page.getByRole('link', { name: 'Explore project', exact: true }).click();
  await page.waitForURL(base + '/projects/distributed-chat-system');
  const navigationWorks = page.url() === base + '/projects/distributed-chat-system';
  // Content and the initial architecture also render with JavaScript disabled.
  const context = await page.context().browser().newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto(base + '/projects/distributed-chat-system');
  const ssrWorks = await staticPage.locator('h1').innerText() === 'Distributed Chat System' && await staticPage.locator('.chat-architecture').getAttribute('data-flow') === 'messages' && await staticPage.locator('#networking').isVisible();
  await context.close();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.chat-architecture').getByRole('button', { name: 'Discovery', exact: true }).click();
  const reducedMotionWorks = await page.locator('.chat-architecture').getAttribute('data-flow') === 'discovery';
  const pass = !errors.length && filterWorks && navigationWorks && ssrWorks && reducedMotionWorks && results.every(result => result.status === 200 && !result.layout.overflow && result.layout.h1Count === 1 && !result.layout.duplicateIds.length && !result.layout.brokenAnchors.length && !result.layout.clippedCopy && !result.violations.length && Object.values(result.checks).every(Boolean) && result.flowResults.every(flow => flow.flow === flow.label.toLowerCase() && flow.pressed === 1 && flow.correctSelection && flow.pathsCorrect && !flow.outsideLabels.length && !flow.clippedNodeLabels.length && flow.replyTargetsClient && flow.smallestLabelPx >= 11.9));
  return { pass, results, errors, filterWorks, navigationWorks, ssrWorks, reducedMotionWorks };
}
