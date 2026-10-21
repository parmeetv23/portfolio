async (page) => {
  const checks = [], audits = [], errors = [], typography = [];
  const check = (name, pass, detail) => checks.push({ name, pass, detail });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const expectedHeadings = [
    'Distributed messaging & server discovery', 'Evaluating object detection under occlusion',
    'Source to assembly', 'Keep the best. Vary the offspring.',
    'Time capacity and candidate schedules', 'Full-stack reservation management',
    'Controller signals to game actions', 'Temperature control rule',
    'Browsing, profiles, and parent controls',
  ];
  const intro = 'I design and build backend systems, distributed architectures, and full-stack applications.';
  for (const width of [1440, 1024, 768, 740, 640, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, route] of [['projects', '/projects'], ['home', '/']]) {
      const response = await page.goto('http://127.0.0.1:3000' + route); await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: [...document.querySelectorAll('.gallery-heading,.v3-introduction,main h2,main button')].filter(el => el.clientWidth && el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
      }));
      check(`${name} layout ${width}`, response.status() === 200 && !layout.overflow && !layout.clipped.length, layout);
      if (name === 'projects') {
        const headings = await page.locator('.collection-project > figure > :is(.gallery-heading,.technical-heading)').allTextContents();
        check(`Only requested listing headings changed ${width}`, JSON.stringify(headings) === JSON.stringify(expectedHeadings), headings);
      } else {
        check(`Exact homepage introduction ${width}`, (await page.locator('.v3-introduction').textContent()).trim() === intro);
        const headings = await page.locator('.gallery-chat .gallery-heading,.gallery-pet .gallery-heading').allTextContents();
        check(`Shared homepage illustration headings preserved ${width}`, JSON.stringify(headings) === JSON.stringify(['Discover a host. Relay between peers.', 'Synthetic occlusion, real evaluation']));
        typography.push({ width, ...await page.locator('.v3-introduction').evaluate(el => { const s = getComputedStyle(el); return { size: s.fontSize, lineHeight: s.lineHeight, height: el.getBoundingClientRect().height, text: el.textContent.trim() }; }) });
      }
      if ([1440, 768, 390, 320].includes(width)) {
        await page.screenshot({ path: `output/playwright/wording-refinement/after-${name}-${width}.png`, fullPage: name === 'projects' });
        if (name === 'projects') {
          for (const [label, selector] of [['chat', '.gallery-chat'], ['pet', '.gallery-pet'], ['restaurant', '.gallery-restaurant']]) {
            const figure = page.locator(selector); await figure.scrollIntoViewIfNeeded(); await figure.screenshot({ path: `output/playwright/wording-refinement/after-${label}-${width}.png` });
          }
        } else {
          await page.locator('.v3-hero').screenshot({ path: `output/playwright/wording-refinement/after-hero-${width}.png` });
        }
        await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
        const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
        audits.push({ name, width, violations });
      }
    }
  }
  await page.goto('http://127.0.0.1:3000/projects');
  for (const [name, count] of [['Distributed', 1], ['ML', 2], ['Full-Stack', 1], ['All', 9]]) {
    const button = page.getByRole('button', { name, exact: true }); await button.focus(); await page.keyboard.press('Space');
    check(`Category filter ${name}`, await page.locator('.collection-project').count() === count && await button.getAttribute('aria-pressed') === 'true');
  }
  await page.getByRole('link', { name: 'Explore the interactive architecture', exact: true }).click(); await page.waitForURL('**/projects/distributed-chat-system#architecture');
  check('Architecture deep link and full diagram', await page.locator('.chat-architecture').count() === 1);
  await page.goto('http://127.0.0.1:3000/');
  await page.locator('.v3-hero-current a').focus(); await page.keyboard.press('Enter'); await page.waitForURL('**/experience/snap-remedy');
  check('Homepage case-study link', await page.locator('main h1').count() === 1);
  check('Accessibility', audits.every(a => !a.violations.length), audits);
  check('No browser errors', !errors.length, errors);
  return { checks, audits, errors, typography };
}
