async (page) => {
  const base = 'http://127.0.0.1:3002';
  const checks = [], routes = [], accessibility = [], errors = [];
  const check = (name, pass, detail) => checks.push({ name, pass, ...(detail === undefined ? {} : { detail }) });
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text()); });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + '/projects');
  const slugs = await page.locator('.collection-copy h2 a').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')));
  for (const route of ['/', '/experience', '/projects', '/resume', ...slugs]) {
    const response = await page.goto(base + route);
    await page.waitForLoadState('networkidle');
    routes.push({ route, status: response.status(), heading: await page.locator('h1').textContent(), mainCount: await page.locator('main').count() });
  }
  check('Production routes render successfully', routes.length === 13 && routes.every(route => route.status === 200 && route.heading && route.mainCount === 1));
  // The failed captions share these three page types. The index includes every
  // conceptual-art background, so this retests each affected contrast pairing.
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/projects', '/resume']) {
      await page.goto(base + route);
      await page.waitForLoadState('networkidle');
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const violations = await page.evaluate(async () => {
        const results = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
        return results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }));
      });
      accessibility.push({ width, route, violations });
    }
  }
  check('Caption contrast and affected accessibility regressions resolved', accessibility.every(result => result.violations.length === 0));
  await page.goto(base + '/resume');
  const frame = page.locator('iframe');
  await page.locator('summary').click();
  check('PDF preview collapses', !await frame.isVisible());
  // Wait through the loading fallback while collapsed; it must stay collapsed.
  await page.waitForTimeout(6500);
  check('PDF preview stays collapsed through loading feedback', !await frame.isVisible());
  await page.locator('summary').click();
  check('PDF preview reopens', await frame.isVisible());
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download PDF', exact: false }).click();
  const download = await downloadPromise;
  check('Current PDF downloads with correct filename', download.suggestedFilename() === 'Parmeet_Virdi_Resume.pdf');
  const response = await page.request.get(base + '/Parmeet_Virdi_Resume.pdf');
  const bytes = await response.body();
  const digest = await page.evaluate(async bytes => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new Uint8Array(bytes)))).map(byte => byte.toString(16).padStart(2, '0')).join(''), Array.from(bytes));
  check('Production serves the current supplied PDF bytes', response.ok() && response.headers()['content-type'].includes('application/pdf') && digest === '069e6d3217a1c5fb9dda9d79c40aa61b17a25ecf839aa09361c834de1bc61da6', { bytes: bytes.length, sha256: digest });
  const popupPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Open PDF', exact: false }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  check('Open PDF launches the document', popup.url().includes('Parmeet_Virdi_Resume.pdf'));
  await popup.close();
  for (const [name, path] of [['Home', '/'], ['Experience', '/experience'], ['Projects', '/projects'], ['Resume', '/resume']]) {
    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name, exact: true }).click();
    await page.waitForURL(base + path);
    check('Production navigation: ' + name, await page.locator('nav[aria-label="Primary navigation"] a[aria-current="page"]').textContent() === name);
  }
  for (const route of ['/missing-page', '/projects/missing-project', '/design-lab/editorial-personal-2']) {
    const response = await page.goto(base + route);
    check('Production 404 and prototype guard: ' + route, response.status() === 404 && await page.locator('main').count() === 1 && await page.locator('footer').count() === 1, { status: response.status(), mains: await page.locator('main').count(), footers: await page.locator('footer').count() });
  }
  return { checks, routes, accessibility, errors };
}
