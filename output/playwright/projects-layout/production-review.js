async (page) => {
  const checks = [], audits = [], errors = [];
  const check = (name, pass, detail) => checks.push({ name, pass, detail });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  for (const width of [1440, 768, 740, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('http://127.0.0.1:3002/projects'); await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      clipped: [...document.querySelectorAll('main h2,main p,main code,main button')].filter(el => getComputedStyle(el).display !== 'inline' && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
      entries: [...document.querySelectorAll('.collection-project')].map(el => ({
        figure: el.querySelector('figure').getBoundingClientRect().y,
        title: el.querySelector('h2').getBoundingClientRect().y,
        copy: el.querySelector('.collection-copy').getBoundingClientRect().y,
      })),
    }));
    check(`Production layout ${width}`, !geometry.overflow && !geometry.clipped.length, geometry);
    if (width > 740) {
      check(`Production pair alignment ${width}`, [[0, 1], [3, 4], [6, 7]].every(([a, b]) => Math.abs(geometry.entries[a].title - geometry.entries[b].title) < 1));
      check(`Production spread alignment ${width}`, [2, 5, 8].every(i => Math.abs(geometry.entries[i].copy - geometry.entries[i].figure) < 1));
    }
    await page.screenshot({ path: `output/playwright/projects-layout/production-projects-${width}.png`, fullPage: true });
    await page.getByRole('button', { name: 'Systems', exact: true }).click();
    check(`Production category filter ${width}`, await page.locator('.collection-project').count() === 2);
    for (const name of ['Below band', 'Inside band', 'Above band']) {
      const b = page.getByRole('button', { name, exact: true }); await b.focus(); await page.keyboard.press('Space');
      check(`Production greenhouse ${name} ${width}`, await b.getAttribute('aria-pressed') === 'true');
    }
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await page.evaluate(() => Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))));
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
    audits.push({ width, violations });
  }
  await page.getByRole('link', { name: 'Explore the interactive architecture', exact: true }).click();
  await page.waitForURL('http://127.0.0.1:3002/projects/distributed-chat-system#architecture');
  await page.locator('.chat-architecture').waitFor();
  check('Production architecture deep link', page.url().endsWith('/projects/distributed-chat-system#architecture'));
  check('Production full architecture present', await page.locator('.chat-architecture').count() === 1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:3002/projects'); await page.getByRole('button', { name: 'ML', exact: true }).focus(); await page.keyboard.press('Enter');
  check('Production reduced-motion keyboard filter', await page.locator('.collection-project').count() === 2);
  check('Production accessibility', audits.every(a => !a.violations.length), audits);
  check('Production browser errors', !errors.length, errors);
  return { checks, audits, errors };
}
