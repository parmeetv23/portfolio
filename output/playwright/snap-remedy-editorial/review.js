async (page) => {
  const base = 'http://127.0.0.1:3000';
  const results = [], errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    await page.setViewportSize({ width, height });
    for (const [name, route] of [['home', '/'], ['experience', '/experience'], ['case', '/experience/snap-remedy']]) {
      const response = await page.goto(base + route);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      if (name === 'home') {
        await page.locator('.personal-note').scrollIntoViewIfNeeded();
        await page.locator('.personal-note img').evaluate(image => image.decode());
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `output/playwright/snap-remedy-editorial/${name}-${device}.png`, fullPage: true });
      if (name !== 'experience') {
        const selector = name === 'home' ? '.v3-current-feature' : '.snap-architecture';
        const clip = await page.locator(selector).evaluate(element => {
          const box = element.getBoundingClientRect();
          return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height };
        });
        await page.screenshot({ path: `output/playwright/snap-remedy-editorial/${name === 'home' ? 'home-feature' : 'architecture'}-${device}.png`, fullPage: true, clip });
      }
      const content = await page.locator('main').innerText();
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1Count: document.querySelectorAll('h1').length,
        clippedStages: [...document.querySelectorAll('.snap-flow > li')].filter(element => element.scrollWidth > Math.ceil(element.getBoundingClientRect().width) + 1).length,
        brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).length,
        brokenAnchors: [...document.querySelectorAll('.case-toc a')].filter(link => !document.getElementById(link.hash.slice(1))).length,
      }));
      const copyChecks = {
        generalized: !/Spire|Groq|FRED|FullSyncCheckpoint|margin_pct|sku-profit/.test(content),
        fullStack: content.includes('Django backend and React frontend'),
        heading: name !== 'home' || content.includes('ERP data pipelines and configurable SKU ranking'),
        sections: name !== 'case' || ['Data modeling and ERP integration', 'Resumable synchronization', 'Configurable SKU ranking', 'Full-stack integration', 'Testing and validation'].every(title => content.includes(title)),
        qualifications: name !== 'case' || ['exactly-once', 'eight factors', 'seven have React controls', 'does not feed SKU scoring', 'mocked providers', 'Software Developer (Contract)', 'Software Developer Intern'].every(term => content.includes(term)),
      };
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const violations = await page.evaluate(async () => {
        const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
        return result.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) }));
      });
      results.push({ device, route, status: response.status(), layout, copyChecks, violations });
    }
  }
  return { results, errors, pass: errors.length === 0 && results.every(result => result.status === 200 && !result.layout.overflow && result.layout.h1Count === 1 && !result.layout.clippedStages && !result.layout.brokenImages && !result.layout.brokenAnchors && Object.values(result.copyChecks).every(Boolean) && result.violations.length === 0) };
}
