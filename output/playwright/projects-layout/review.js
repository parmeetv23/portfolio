async (page) => {
  const base = 'http://127.0.0.1:3000';
  const checks = [], layouts = [], accessibility = [], errors = [];
  const check = (name, pass, detail) => checks.push({ name, pass, detail });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  const readLayout = () => page.evaluate(() => {
    const rect = el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; };
    const entries = [...document.querySelectorAll('.collection-project')].map(a => ({
      title: a.querySelector('h2').textContent,
      article: rect(a), figure: rect(a.querySelector('figure')), copy: rect(a.querySelector('.collection-copy')),
      titleRect: rect(a.querySelector('h2')),
      copyEndGap: a.querySelector('.collection-copy').getBoundingClientRect().bottom - a.querySelector('.collection-copy > .text-link').getBoundingClientRect().bottom,
    }));
    return {
      width: innerWidth, height: document.documentElement.scrollHeight, entries,
      overflow: document.documentElement.scrollWidth > innerWidth,
      clipped: [...document.querySelectorAll('main h1,main h2,main p,main code,main button,main dt,main dd')]
        .filter(el => getComputedStyle(el).display !== 'inline' && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1)
        .map(el => el.textContent),
      figureOverflow: [...document.querySelectorAll('.collection-project > figure')].flatMap(f => {
        const r = f.getBoundingClientRect();
        return [...f.querySelectorAll('p,code,button,figcaption,li,dt,dd')].filter(el => {
          const b = el.getBoundingClientRect(); return b.x < r.x - 1 || b.right > r.right + 1 || b.bottom > r.bottom + 1;
        }).map(el => el.textContent);
      }),
    };
  });
  const audit = async label => {
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => (await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] },
    })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
    accessibility.push({ label, violations });
  };
  const categories = [['Distributed', 1], ['ML', 2], ['Systems', 2], ['Algorithms', 1], ['Full-Stack', 1], ['Embedded', 1], ['Frontend', 1], ['All', 9]];
  for (const width of [1440, 1280, 1024, 1000, 768, 741, 740, 640, 601, 600, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const response = await page.goto(base + '/projects');
    await page.evaluate(() => document.fonts.ready);
    const layout = await readLayout(); layouts.push(layout);
    check(`Projects layout ${width}`, response.status() === 200 && !layout.overflow && !layout.clipped.length && !layout.figureOverflow.length, layout);
    check(`Natural copy heights ${width}`, layout.entries.every(e => Math.abs(e.copyEndGap) < 1));
    if (width > 740) {
      check(`Paired title alignment ${width}`, [[0, 1], [3, 4], [6, 7]].every(([a, b]) => Math.abs(layout.entries[a].titleRect.y - layout.entries[b].titleRect.y) < 1));
      check(`Spread top alignment ${width}`, [2, 5, 8].every(i => Math.abs(layout.entries[i].copy.y - layout.entries[i].figure.y) < 1));
    }
    if ([1440, 1024, 1000, 768, 741, 740, 640, 601, 600, 390, 320].includes(width)) {
      await page.screenshot({ path: `output/playwright/projects-layout/after-projects-${width}.png`, fullPage: true });
    }
    for (const [category, count] of categories) {
      const button = page.getByRole('button', { name: category, exact: true });
      await button.focus(); await page.keyboard.press('Space');
      await page.waitForFunction(name => [...document.querySelectorAll('.filter-bar button')].find(b => b.textContent === name)?.getAttribute('aria-pressed') === 'true', category);
      const filtered = await readLayout();
      check(`Filter ${category} ${width}`, filtered.entries.length === count && !filtered.overflow && !filtered.clipped.length && !filtered.figureOverflow.length, filtered);
      if ([1440, 768, 390].includes(width) && ['ML', 'Systems', 'Full-Stack'].includes(category)) {
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: `output/playwright/projects-layout/filter-${category.toLowerCase()}-${width}.png`, fullPage: true });
      }
    }
    for (const name of ['Below band', 'Inside band', 'Above band']) {
      const button = page.getByRole('button', { name, exact: true });
      await button.scrollIntoViewIfNeeded(); await button.focus(); await page.keyboard.press('Enter');
      const condition = await page.locator('.temperature-control').textContent();
      const expected = name === 'Below band' ? 'The furnace is active; cooling is off.' : name === 'Above band' ? 'The air conditioner is active; heating is off.' : 'Both temperature actuators are off inside the target band.';
      const stateLayout = await readLayout();
      check(`Temperature keyboard ${name} ${width}`, await button.getAttribute('aria-pressed') === 'true' && condition.includes(expected) && !stateLayout.clipped.length && !stateLayout.figureOverflow.length);
    }
    await audit(`Projects ${width}`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto(base + '/projects');
  const links = await page.locator('.collection-copy h2 a').evaluateAll(a => a.map(el => ({ title: el.textContent, href: el.getAttribute('href') })));
  check('Nine distinct project destinations', links.length === 9 && new Set(links.map(a => a.href)).size === 9);
  for (const link of links) {
    await page.locator(`.collection-copy h2 a[href="${link.href}"]`).click(); await page.waitForURL(base + link.href);
    check(`Project navigation ${link.title}`, await page.locator('main h1').count() === 1);
    await page.goto(base + '/projects');
  }
  const explore = page.locator('.collection-copy > .text-link').first(); await explore.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  check('Project link keyboard focus visible', await explore.evaluate(el => el === document.activeElement && el.matches(':focus-visible') && getComputedStyle(el).outlineStyle !== 'none'));
  await page.getByRole('link', { name: 'Explore the interactive architecture', exact: true }).click(); await page.waitForURL(base + '/projects/distributed-chat-system#architecture');
  const chat = page.locator('.chat-architecture');
  for (const name of ['Discovery', 'Messages', 'Coordination', 'Failure & election']) {
    const b = chat.getByRole('button', { name, exact: true }); await b.focus(); await page.keyboard.press('Space');
    check(`Full chat ${name}`, await b.getAttribute('aria-pressed') === 'true');
  }
  for (const name of ['1. Primary lost', '2. Election', '3. New primary']) {
    const b = chat.getByRole('button', { name, exact: true }); await b.focus(); await page.keyboard.press('Enter');
    check(`Chat election ${name}`, await b.getAttribute('aria-pressed') === 'true');
  }
  await chat.getByRole('button', { name: 'Messages', exact: true }).click();
  for (const name of ['1', '2']) { await chat.getByRole('group', { name: 'Gossip fan-out' }).getByRole('button', { name, exact: true }).click(); check(`Chat fan-out ${name}`, await chat.getAttribute('data-fanout') === name); }
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.setViewportSize({ width: 390, height: 844 }); await page.goto(base + '/projects');
  await page.getByRole('button', { name: 'Systems', exact: true }).click();
  await page.getByRole('button', { name: 'Above band', exact: true }).click();
  check('Reduced-motion filters and controls', await page.locator('.collection-project').count() === 2 && await page.getByRole('button', { name: 'Above band', exact: true }).getAttribute('aria-pressed') === 'true' && await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto'));
  const menu = page.locator('.menu-toggle'); await menu.focus(); await page.keyboard.press('Enter');
  check('Mobile navigation opens', await menu.getAttribute('aria-expanded') === 'true'); await page.keyboard.press('Escape');
  check('Mobile menu Escape and focus', await menu.getAttribute('aria-expanded') === 'false' && await menu.evaluate(el => el === document.activeElement));
  await menu.click(); await page.locator('#site-menu').getByRole('link', { name: 'Home', exact: true }).click(); await page.waitForURL(base + '/');
  check('Mobile primary navigation', await page.locator('main h1').count() === 1);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const [name, route] of [['home', '/'], ['compiler', '/projects/j-minus-minus-mips-compiler'], ['climate', '/projects/climate-control-simulation'], ['scheduling', '/projects/ai-scheduling-hard-constraints'], ['streaming', '/projects/family-streaming-interface']]) {
      const response = await page.goto(base + route); await page.evaluate(() => document.fonts.ready);
      if (name === 'home') { await page.locator('.personal-note').scrollIntoViewIfNeeded(); await page.locator('.personal-note img').evaluateAll(images => Promise.all(images.map(i => i.decode()))); }
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `output/playwright/projects-layout/after-${name}-${width}.png`, fullPage: true });
      check(`Shared page ${name} ${width}`, response.status() === 200 && await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await audit(`${name} ${width}`);
    }
  }
  check('Accessibility', accessibility.every(a => !a.violations.length), accessibility);
  check('No browser errors', errors.length === 0, errors);
  return { checks, layouts, accessibility, errors };
}
