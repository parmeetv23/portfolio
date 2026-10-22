// Production browser checks and matching interaction-state captures.
// Invoke through Playwright CLI; see docs/REPOSITORY-QUALITY.md.
async (page) => {
  const initial = new URL(page.url());
  const base = initial.origin;
  const phase = initial.searchParams.get('quality-phase') || 'final';
  if (!['baseline', 'final'].includes(phase)) throw new Error('Invalid verification phase');
  const directory = `output/playwright/repository-cleanup/${phase}`;
  const checks = [], routes = [], accessibility = [], errors = [], failedResponses = [];
  const check = (name, pass, detail) => checks.push({ name, pass, detail });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().includes('404 (Not Found)')) errors.push(message.text());
  });
  page.on('response', response => {
    if (response.status() >= 400) failedResponses.push({ url: response.url(), status: response.status() });
  });
  const capture = async name => {
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/${name}.png`, animations: 'disabled' });
  };
  await page.goto(base + '/projects');
  const projectPaths = await page.locator('.collection-copy h2 a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
  check('Nine projects in the approved order', JSON.stringify(projectPaths.map(path => path.split('/').pop())) === JSON.stringify([
    'distributed-chat-system', 'occluded-pet-detection', 'j-minus-minus-mips-compiler',
    'genetic-algorithm-hyperparameter-finder', 'ai-scheduling-hard-constraints',
    'fullstack-restaurant-system', 'raspberry-pi-bare-metal', 'climate-control-simulation', 'family-streaming-interface',
  ]));

  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto(base + '/projects');
    for (const [category, count] of [['Distributed', 1], ['ML', 2], ['Embedded', 1], ['Full-Stack', 1], ['Systems', 2], ['Algorithms', 1], ['Frontend', 1], ['All', 9]]) {
      const button = page.getByRole('button', { name: category, exact: true });
      await button.focus();
      await page.keyboard.press('Enter');
      check(`${width}: keyboard filter ${category}`, await page.locator('.collection-project').count() === count && await button.getAttribute('aria-pressed') === 'true');
      if (category === 'ML') await capture(`filter-ml-${width}`);
    }
    await page.goto(base + '/projects/distributed-chat-system');
    const figure = page.locator('.chat-architecture');
    for (const [label, flow] of [['Discovery', 'discovery'], ['Messages', 'messages'], ['Coordination', 'coordination'], ['Failure & election', 'failure']]) {
      const button = page.getByRole('group', { name: 'Architecture view', exact: true }).getByRole('button', { name: label, exact: true });
      await button.focus();
      await page.keyboard.press('Enter');
      check(`${width}: architecture ${flow}`, await figure.getAttribute('data-flow') === flow && await button.getAttribute('aria-pressed') === 'true');
      if (flow === 'messages') {
        for (const fanout of [1, 2]) {
          await page.getByRole('group', { name: 'Gossip fan-out' }).getByRole('button', { name: String(fanout), exact: true }).click();
          check(`${width}: fan-out ${fanout}`, await figure.getAttribute('data-fanout') === String(fanout));
          await figure.screenshot({ path: `${directory}/chat-fanout-${fanout}-${width}.png`, animations: 'disabled' });
        }
      } else if (flow === 'failure') {
        for (const [label, stage] of [['1. Primary lost', 'lost'], ['2. Election', 'election'], ['3. New primary', 'leader']]) {
          const control = page.getByRole('group', { name: 'Election sequence' }).getByRole('button', { name: label, exact: true });
          await control.focus();
          await page.keyboard.press('Enter');
          check(`${width}: election ${stage}`, await page.locator(`[data-election-stage="${stage}"]`).count() === 2 && await control.getAttribute('aria-pressed') === 'true');
          await figure.screenshot({ path: `${directory}/chat-${stage}-${width}.png`, animations: 'disabled' });
        }
      } else {
        await figure.screenshot({ path: `${directory}/chat-${flow}-${width}.png`, animations: 'disabled' });
      }
    }
    await page.goto(base + '/projects/climate-control-simulation');
    const temperature = page.getByRole('group', { name: 'Temperature relative to target' });
    for (const [index, values] of [['On', 'Off'], ['Off', 'Off'], ['Off', 'On']].entries()) {
      const button = temperature.getByRole('button').nth(index);
      await button.focus();
      await page.keyboard.press('Enter');
      check(`${width}: temperature ${index}`, JSON.stringify(await page.locator('.actuator-states dd').allTextContents()) === JSON.stringify(values));
      // Native focus can initiate smooth scrolling. Check its settled position,
      // rather than sampling a frame while the control is still moving.
      await page.waitForFunction(() => {
        const node = document.activeElement;
        const rect = node.getBoundingClientRect();
        return rect.top >= document.querySelector('.site-navigation').getBoundingClientRect().bottom && rect.bottom <= innerHeight;
      }, null, { timeout: 3000 }).catch(() => {});
      check(`${width}: visible keyboard focus ${index}`, await button.evaluate(node => {
        const style = getComputedStyle(node), rect = node.getBoundingClientRect();
        return node === document.activeElement && style.outlineStyle !== 'none' && rect.top >= document.querySelector('.site-navigation').getBoundingClientRect().bottom && rect.bottom <= innerHeight;
      }));
      await page.locator('.temperature-control').screenshot({ path: `${directory}/temperature-${index}-${width}.png`, animations: 'disabled' });
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + '/');
  await page.keyboard.press('Tab');
  check('Skip link receives first keyboard focus', await page.locator('.site-skip').evaluate(node => node === document.activeElement));
  await page.keyboard.press('Enter');
  check('Skip link focuses main', await page.locator('main').evaluate(node => node === document.activeElement));
  const track = page.locator('.v3-strip-track');
  await page.getByRole('button', { name: 'Scroll more projects' }).click();
  await page.waitForFunction(() => document.querySelector('.v3-strip-track').scrollLeft > 0);
  check('Project strip scrolls', await track.evaluate(node => node.scrollLeft > 0));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  check('Reduced motion disables smooth scrolling and transitions', await page.locator('.v3-work-link').evaluate(node => getComputedStyle(node).transitionDuration === '0s' && getComputedStyle(document.documentElement).scrollBehavior === 'auto'));
  await page.getByRole('button', { name: 'Scroll more projects' }).click();
  check('Project strip works with reduced motion', await track.evaluate(node => node.scrollLeft > 0));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  check('Two personal photos present', await page.locator('.personal-note-photo img').count() === 2);
  check('Compiler preview remains visible', await page.locator('.v3-compiler-study .gallery-compiler').isVisible());
  check('Contact email preserved', await page.locator('.v3-contact-details a').getAttribute('href') === 'mailto:parmeetv1@gmail.com');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact', exact: false }).click();
  check('Contact navigates to footer', new URL(page.url()).hash === '#contact');
  for (const [name, path] of [['Experience', '/experience'], ['Projects', '/projects'], ['Resume', '/resume'], ['Home', '/']]) {
    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name, exact: true }).click();
    await page.waitForURL(base + path);
    check(`Navigation ${name}`, await page.locator('nav[aria-label="Primary navigation"] a[aria-current="page"]').textContent() === name);
  }
  for (const path of projectPaths) {
    await page.goto(base + '/projects');
    await page.evaluate(() => { window.__qualityNavigation = true; });
    await page.locator(`.collection-copy h2 a[href="${path}"]`).click();
    await page.waitForURL(base + path);
    check(`Client navigation ${path}`, await page.evaluate(() => window.__qualityNavigation === true));
  }
  await page.goto(base + '/resume');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download PDF', exact: false }).click();
  check('Resume download filename', (await downloadPromise).suggestedFilename() === 'Parmeet_Virdi_Resume.pdf');
  const pdf = await page.request.get(base + '/Parmeet_Virdi_Resume.pdf');
  check('Resume PDF response', pdf.ok() && pdf.headers()['content-type'].includes('application/pdf') && (await pdf.body()).slice(0, 5).toString() === '%PDF-');
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Open PDF', exact: false }).click();
  const popup = await popupPromise;
  check('Resume new-tab preview', popup.url().includes('Parmeet_Virdi_Resume.pdf'));
  await popup.close();
  await page.locator('summary').click();
  await page.waitForTimeout(6500);
  check('Resume stays collapsed through fallback timer', !await page.locator('iframe').isVisible());
  await page.locator('summary').click();
  check('Resume preview reopens', await page.locator('iframe').isVisible());

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Menu', exact: false }).focus();
  await page.keyboard.press('Enter');
  check('Keyboard opens mobile menu', await page.locator('#site-menu').isVisible());
  await capture('mobile-menu-390');
  await page.keyboard.press('Escape');
  check('Escape closes menu and restores focus', !await page.locator('#site-menu').isVisible() && await page.locator('.menu-toggle').evaluate(node => node === document.activeElement));
  await page.getByRole('button', { name: 'Menu', exact: false }).click();
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
  await page.waitForURL(base + '/projects');
  check('Mobile menu closes after navigation', !await page.locator('#site-menu').isVisible());

  // Final-only broad audit; baseline interaction screenshots use identical states.
  if (phase === 'final') {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      for (const route of ['/', '/experience', '/experience/snap-remedy', '/projects', ...projectPaths, '/resume']) {
        const response = await page.goto(base + route);
        await page.waitForLoadState('networkidle');
        await page.locator('img').evaluateAll(async images => Promise.all(images.map(async image => { image.loading = 'eager'; await image.decode(); })));
        const state = await page.evaluate(() => {
          const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
          return {
            overflow: document.documentElement.scrollWidth > innerWidth,
            brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).length,
            headings: document.querySelectorAll('h1').length,
            mains: document.querySelectorAll('main').length,
            duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
            brokenAnchors: [...document.querySelectorAll('a[href^="#"]')]
              .map(node => node.getAttribute('href'))
              .filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))),
          };
        });
        routes.push({ width, route, status: response.status(), ...state });
        if ([390, 1440].includes(width)) {
          await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
          accessibility.push({ width, route, violations: await page.evaluate(async () => {
            const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
            return result.violations.map(violation => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map(node => node.target) }));
          }) });
        }
      }
    }
    check('All 56 route/viewport checks pass', routes.length === 56 && routes.every(route => route.status === 200 && !route.overflow && !route.brokenImages && route.headings === 1 && route.mains === 1 && !route.duplicateIds.length && !route.brokenAnchors.length));
    check('All 28 axe WCAG A/AA checks pass', accessibility.length === 28 && accessibility.every(result => !result.violations.length));
    const linkPaths = new Set();
    for (const route of ['/', '/experience', '/experience/snap-remedy', '/projects', ...projectPaths, '/resume']) {
      await page.goto(base + route);
      for (const href of await page.locator('a[href^="/"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) linkPaths.add(href.split('#')[0]);
    }
    for (const path of linkPaths) {
      const response = await page.request.get(base + path);
      check(`Internal link ${path}`, response.ok(), response.status());
    }
    const redirect = await page.request.get(base + '/projects/kiddoflix', { maxRedirects: 0 });
    check('Legacy streaming URL redirects permanently', redirect.status() === 308 && redirect.headers().location === '/projects/family-streaming-interface');
    const failuresBefore404 = [...failedResponses];
    for (const path of ['/not-a-page', '/projects/not-a-project', '/404', '/design-lab', ...['editorial', 'editorial-v2', 'editorial-v3', 'editorial-personal', 'editorial-personal-2', 'experimental'].map(name => '/design-lab/' + name)]) {
      const response = await page.goto(base + path);
      check(`HTTP 404 ${path}`, response.status() === 404 && await page.locator('main').count() === 1 && await page.locator('footer').count() === 1);
    }
    check('No failed public-page asset responses', failuresBefore404.length === 0, failuresBefore404);
    for (const path of ['/.env', '/.git/config', '/docs/professional-reference/catalog.json', '/output/playwright/quality-recovery/REPORT.md']) {
      const response = await page.request.get(base + path);
      check(`Source/local records are not served ${path}`, response.status() === 404);
    }
    const staticContext = await page.context().browser().newContext({ javaScriptEnabled: false });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(base + '/projects');
    check('Projects remain server-rendered without JavaScript', await staticPage.locator('.collection-project').count() === 9);
    await staticContext.close();
  }
  check('No browser errors', errors.length === 0, errors);
  return { phase, checks, routes, accessibility, errors, failedResponses };
}
