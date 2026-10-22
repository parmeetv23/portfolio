// Run with Playwright CLI --filename after opening the production URL with
// ?quality-phase=baseline or ?quality-phase=final. See docs/REPOSITORY-QUALITY.md.
async (page) => {
  const url = new URL(page.url());
  const phase = url.searchParams.get('quality-phase') || 'baseline';
  if (!['baseline', 'final'].includes(phase)) throw new Error('Invalid capture phase');
  const base = url.origin;
  const directory = `output/playwright/repository-cleanup/${phase}`;
  await page.goto(`${base}/projects`);
  const projects = await page.locator('.collection-copy h2 a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
  const results = [];
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const route of ['/', '/experience', '/experience/snap-remedy', '/projects', ...projects, '/resume']) {
      const response = await page.goto(base + route);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      await page.locator('img').evaluateAll(async images => {
        await Promise.all(images.map(async image => {
          image.loading = 'eager';
          await image.decode();
        }));
      });
      // Native PDF plugins differ between captures; compare the surrounding UI
      // and iframe dimensions while verifying the PDF separately.
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
      await page.screenshot({ path: `${directory}/${name}-${width}.png`, fullPage: true, animations: 'disabled', mask: await page.locator('iframe').all() });
      const documentState = await page.evaluate(() => ({
        text: document.querySelector('main').innerText,
        links: [...document.querySelectorAll('a')].map(link => [link.textContent, link.getAttribute('href')]),
        images: [...document.images].map(image => [image.getAttribute('src'), image.naturalWidth, image.naturalHeight]),
        dimensions: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      }));
      results.push({ width, route, status: response.status(), ...documentState });
    }
  }
  return { phase, results };
}
