async (page) => {
  const checks = [], layouts = [], audits = [], errors = [];
  const check = (name, pass, detail) => checks.push({ name, pass, detail });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.addInitScript(() => {
    window.heroLayoutShifts = [];
    new PerformanceObserver(list => list.getEntries().forEach(e => { if (!e.hadRecentInput) window.heroLayoutShifts.push(e.value); })).observe({ type: 'layout-shift', buffered: true });
  });
  for (const width of [1920, 1440, 1280, 1100, 1024, 1001, 1000, 768, 741, 740, 601, 600, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 }); await page.goto('http://127.0.0.1:3000/'); await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const layout = await page.evaluate(() => {
      const hero = document.querySelector('.v3-hero'), intro = hero.querySelector('.v3-introduction'), s = getComputedStyle(intro);
      const rect = el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; };
      return {
        width: innerWidth, fontSize: s.fontSize, lineHeight: s.lineHeight, introWidth: intro.clientWidth, headline: rect(intro), hero: rect(hero), name: rect(hero.querySelector('h1')),
        text: intro.textContent.trim(), lines: [...intro.querySelectorAll(':scope > .hero-line')].map(el => ({ text: el.textContent, ...rect(el), display: getComputedStyle(el).display })),
        overflow: document.documentElement.scrollWidth > innerWidth,
        clipped: [...hero.querySelectorAll('h1,p,a')].filter(el => getComputedStyle(el).display !== 'inline' && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
        cls: window.heroLayoutShifts.reduce((a, b) => a + b, 0),
      };
    }); layouts.push(layout);
    check(`Hero layout ${width}`, !layout.overflow && !layout.clipped.length, layout);
    check(`Exact statement ${width}`, layout.text === 'I design and build backend systems, distributed architectures, and full-stack applications.');
    check(`No material load shifts ${width}`, layout.cls < .01, layout.cls);
    if (width > 1000) {
      check(`Four desktop lines ${width}`, layout.lines.length === 4 && layout.lines.every(l => l.display === 'block' && Math.abs(l.h - parseFloat(layout.lineHeight)) < 1));
      check(`Separated desktop columns ${width}`, layout.name.x + layout.name.w < layout.headline.x);
    } else {
      check(`Natural responsive wrapping ${width}`, layout.lines.every(l => l.display === 'inline'));
    }
    await page.screenshot({ path: `output/playwright/hero-composition/after-${width}.png` });
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
    audits.push({ width, violations });
  }
  await page.setViewportSize({ width: 844, height: 390 }); await page.goto('http://127.0.0.1:3000/'); await page.evaluate(() => document.fonts.ready);
  check('Landscape overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: 'output/playwright/hero-composition/after-landscape-844.png', fullPage: false });
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('http://127.0.0.1:3000/');
  const snap = page.locator('.v3-hero-current a'); await snap.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  check('Case-study link keyboard focus', await snap.evaluate(el => el === document.activeElement && el.matches(':focus-visible') && getComputedStyle(el).outlineStyle !== 'none'));
  await page.keyboard.press('Enter'); await page.waitForURL('**/experience/snap-remedy');
  check('Case-study navigation', await page.locator('main h1').count() === 1);
  await page.goto('http://127.0.0.1:3000/');
  const anchor = page.locator('.v3-work-link'); await anchor.focus(); await page.keyboard.press('Enter');
  await page.waitForFunction(() => Math.abs(document.querySelector('#v3-experience').getBoundingClientRect().top - 105) < 4);
  check('Professional-experience smooth scroll', await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'smooth') && page.url().endsWith('#v3-experience'));
  await page.goto('http://127.0.0.1:3000/');
  const projects = page.locator('#site-menu').getByRole('link', { name: 'Projects', exact: true }); await projects.hover();
  await page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect?.target?.closest?.('#site-menu')).map(a => a.finished.catch(() => {}))));
  check('Navigation hover animation retained', await projects.evaluate(el => getComputedStyle(el, '::after').transform === 'matrix(1, 0, 0, 1, 0, 0)'));
  const browse = page.getByRole('button', { name: 'Scroll more projects', exact: true }); await browse.click();
  await page.waitForFunction(() => document.querySelector('.v3-strip-track').scrollLeft > 0);
  check('Project-strip scrolling', await page.locator('.v3-strip-track').evaluate(el => el.scrollLeft > 0));
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('http://127.0.0.1:3000/');
  await page.locator('.v3-work-link').focus(); await page.keyboard.press('Enter');
  await page.waitForFunction(() => Math.abs(document.querySelector('#v3-experience').getBoundingClientRect().top - 105) < 4);
  check('Reduced-motion anchor', await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto'));
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('http://127.0.0.1:3000/');
  const menu = page.locator('.menu-toggle'); await menu.focus(); await page.keyboard.press('Enter'); check('Mobile menu opens', await menu.getAttribute('aria-expanded') === 'true');
  await page.keyboard.press('Escape'); check('Mobile Escape and focus', await menu.getAttribute('aria-expanded') === 'false' && await menu.evaluate(el => el === document.activeElement));
  await menu.click(); await page.locator('#site-menu').getByRole('link', { name: 'Projects', exact: true }).click(); await page.waitForURL('**/projects');
  check('Mobile primary navigation', await page.locator('.collection-project').count() === 9);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 }); await page.goto('http://127.0.0.1:3000/'); await page.evaluate(() => document.fonts.ready);
    await page.locator('.personal-note').scrollIntoViewIfNeeded(); await page.locator('.personal-note img').evaluateAll(images => Promise.all(images.map(i => i.decode())));
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `output/playwright/hero-composition/after-home-full-${width}.png`, fullPage: true });
  }
  check('Accessibility', audits.every(a => !a.violations.length), audits);
  check('No browser errors', !errors.length, errors);
  return { checks, layouts, audits, errors };
}
