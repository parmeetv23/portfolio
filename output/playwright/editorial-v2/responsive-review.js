async (page) => {
  const report = [];
  for (const width of [320, 390, 600, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({width, height: width < 600 ? 844 : 1000});
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo(0,0));
    report.push(await page.evaluate(() => {
      const title = document.querySelector('h1');
      const range = document.createRange();
      range.selectNodeContents(title);
      const lines = [...range.getClientRects()].filter(r => r.width > 0);
      const main = document.querySelector('main');
      const bad = [...document.querySelectorAll('main > section, header, footer, h1, h2, button')].filter(el => {const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth+1 || r.left < -1);}).map(el => ({tag: el.tagName, text: el.textContent.slice(0,60)}));
      return {width:innerWidth, pageWidth:document.documentElement.scrollWidth, overflow:document.documentElement.scrollWidth > innerWidth, mainCount:document.querySelectorAll('main').length, h1Count:document.querySelectorAll('h1').length, h1Lines:lines.length, h1Right:title.getBoundingClientRect().right, mainWidth:main.getBoundingClientRect().width, outside:bad, robots:document.querySelector('meta[name="robots"]')?.content};
    }));
  }
  return report;
}
