async (page) => {
  const base = 'http://127.0.0.1:3002';
  const results = [];
  for (const route of ['/design-lab', '/design-lab/editorial', '/design-lab/experimental', '/design-lab/editorial-v2', '/design-lab/editorial-v3', '/design-lab/editorial-personal', '/design-lab/editorial-personal-2']) {
    const response = await page.request.get(base + route);
    results.push({ route, status: response.status(), pass: response.status() === 404 });
  }
  await page.goto(base + '/design-lab/editorial-personal-2');
  const view = { heading: await page.locator('h1').textContent(), mains: await page.locator('main').count(), footers: await page.locator('footer').count(), prototypeCount: await page.locator('.v3-hero').count() };
  const publicRoutes = [];
  for (const route of ['/', '/experience', '/projects', '/resume', '/projects/distributed-chat-system']) {
    const response = await page.request.get(base + route);
    publicRoutes.push({ route, status: response.status(), pass: response.status() === 200 });
  }
  return { results, view, publicRoutes, pass: results.every(result => result.pass) && publicRoutes.every(result => result.pass) && view.heading === 'Page not found.' && view.mains === 1 && view.footers === 1 && view.prototypeCount === 0 };
}
