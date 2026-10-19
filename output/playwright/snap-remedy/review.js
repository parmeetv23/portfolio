async (page) => {
  const base = 'http://127.0.0.1:3003';
  const routes = [['home', '/'], ['experience', '/experience'], ['case', '/experience/snap-remedy']];
  const layouts = [], accessibility = [], checks = [], errors = [];
  const check = (name, pass, detail) => checks.push({ name, pass, detail });
  const captureElement = async (selector, path) => {
    // Capture document coordinates without scrolling sticky navigation over the subject.
    const clip = await page.locator(selector).evaluate(element => {
      const box = element.getBoundingClientRect();
      return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height };
    });
    await page.screenshot({ path, fullPage: true, clip });
  };
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });

  for (const [device, width, height] of [['narrow', 320, 844], ['mobile', 390, 844], ['tablet', 820, 1180], ['desktop', 1440, 1000]]) {
    await page.setViewportSize({ width, height });
    for (const [name, route] of routes) {
      const response = await page.goto(base + route);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      if (name === 'home') {
        await page.locator('.personal-note').scrollIntoViewIfNeeded();
        await page.locator('.personal-note img').evaluate(image => image.decode());
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      const geometry = await page.evaluate(() => {
        const stages = [...document.querySelectorAll('.snap-flow > li')].map(node => {
          const box = node.getBoundingClientRect();
          return { x: box.x, y: box.y, width: box.width, scrollWidth: node.scrollWidth, title: node.querySelector('.snap-stage-title').textContent };
        });
        return {
          width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          mainCount: document.querySelectorAll('main').length, h1Count: document.querySelectorAll('h1').length,
          brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
          activeNavigation: document.querySelector('nav[aria-label="Primary navigation"] a[aria-current="page"]')?.textContent,
          stages,
        };
      });
      layouts.push({ device, route, status: response.status(), ...geometry });
      check(`${device} ${route}: page and layout`, response.status() === 200 && geometry.mainCount === 1 && geometry.h1Count === 1 && geometry.scrollWidth <= width && geometry.brokenImages.length === 0);
      if (geometry.stages.length) {
        const vertical = name === 'case' ? width <= 1000 : width <= 600;
        const ordered = geometry.stages.every((stage, index, stages) => index === 0 || (vertical ? stage.y > stages[index - 1].y : stage.x > stages[index - 1].x));
        check(`${device} ${route}: diagram direction and labels`, ordered && geometry.stages.every(stage => stage.scrollWidth <= Math.ceil(stage.width) + 1), { direction: vertical ? 'vertical' : 'horizontal' });
      }
      const publicText = await page.locator('main').innerText();
      check(`${device} ${route}: generalized public content`, !/Spire|Groq|FRED|FullSyncCheckpoint|margin_pct|sku-profit|SCORING_API_ENDPOINT_GUIDE/.test(publicText));
      if (name !== 'home') {
        check(`${device} ${route}: contract progression`, publicText.includes('Software Developer (Contract)') && publicText.includes('Software Developer Intern') && geometry.activeNavigation === 'Experience');
      }
      check(`${device} ${route}: no private-document links`, await page.locator('main a[href*="professional-reference"], main a[href^="/docs/"], main a[href*="PROJECT_ANALYSIS"]').count() === 0);

      if (device === 'mobile' || device === 'desktop') {
        await page.screenshot({ path: `output/playwright/snap-remedy/${name}-${device}.png`, fullPage: true });
        if (name === 'home') await captureElement('.v3-current-feature', `output/playwright/snap-remedy/home-feature-${device}.png`);
        if (name === 'case') await captureElement('.snap-architecture', `output/playwright/snap-remedy/architecture-${device}.png`);
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
        const violations = await page.evaluate(async () => {
          const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
          return result.violations.map(item => ({ id: item.id, impact: item.impact, targets: item.nodes.map(node => node.target) }));
        });
        accessibility.push({ device, route, violations });
      }
    }
  }
  check('Automated accessibility checks', accessibility.every(result => result.violations.length === 0));

  const noJsContext = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJsContext.newPage();
  for (const [, route] of routes) {
    await noJsPage.goto(base + route);
    check(`Content renders without JavaScript: ${route}`, (await noJsPage.locator('main').innerText()).includes('Django'));
  }
  await noJsContext.close();

  await page.goto(base + '/projects');
  const projectRoutes = await page.locator('.collection-copy h2 a').evaluateAll(links => links.map(link => link.getAttribute('href')));
  const routeStatuses = [];
  for (const route of ['/', '/experience', '/experience/snap-remedy', '/projects', '/resume', ...projectRoutes]) {
    const response = await page.request.get(base + route);
    routeStatuses.push({ route, status: response.status() });
  }
  check('All public routes return 200', routeStatuses.length === 14 && routeStatuses.every(result => result.status === 200), routeStatuses);
  const prototype = await page.request.get(base + '/design-lab/editorial-personal-2');
  check('Production prototype guard', prototype.status() === 404);
  check('No browser errors', errors.length === 0, errors);
  return { checks, layouts, accessibility, errors };
}
