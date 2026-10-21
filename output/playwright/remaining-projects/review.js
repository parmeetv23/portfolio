async (page) => {
  const base = 'http://127.0.0.1:3002';
  const slugs = ['occluded-pet-detection', 'genetic-algorithm-hyperparameter-finder', 'ai-scheduling-hard-constraints', 'raspberry-pi-bare-metal', 'fullstack-restaurant-system', 'j-minus-minus-mips-compiler', 'climate-control-simulation', 'kiddoflix'];
  const routes = ['/', '/projects', ...slugs.map(slug => `/projects/${slug}`), '/experience/snap-remedy', '/projects/distributed-chat-system'];
  const errors = [], results = [], links = new Set(), interactions = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const width of [1440, 390, 320, 820]) {
    await page.setViewportSize({width, height: width < 600 ? 844 : 1000});
    for (const route of routes) {
      const response = await page.goto(base + route);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      await page.locator('img').evaluateAll(async images => { await Promise.all(images.map(async image => { image.loading = 'eager'; await image.decode().catch(() => {}); })); });
      const state = await page.evaluate(() => {
        const main = document.querySelector('main');
        const visible = element => !!element.getClientRects().length;
        const checked = [...main.querySelectorAll('.project-technical, .case-body, .experiment-table, .case-toc, .case-heading, .collection-copy')].filter(visible);
        return {
          title: document.title,
          heading: main.querySelector('h1').textContent,
          h1Count: main.querySelectorAll('h1').length,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
          clipped: checked.filter(element => element.scrollWidth > Math.ceil(element.getBoundingClientRect().width) + 1).map(element => element.className),
          duplicateIds: [...document.querySelectorAll('[id]')].map(element => element.id).filter((id, index, ids) => ids.indexOf(id) !== index),
          brokenAnchors: [...main.querySelectorAll('a[href^="#"]')].filter(link => !document.getElementById(decodeURIComponent(link.hash.slice(1)))).map(link => link.hash),
          images: [...main.querySelectorAll('img')].map(image => ({src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0, alt: image.hasAttribute('alt')})),
          links: [...document.querySelectorAll('a[href^="/"]')].map(link => link.getAttribute('href')),
          tools: !!main.querySelector('#technologies'),
          sections: [...main.querySelectorAll('.case-section h2')].map(element => element.textContent),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        };
      });
      state.links.forEach(link => links.add(link));
      let violations = [];
      if ([1440,390].includes(width)) {
        await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
        violations = await page.evaluate(async () => (await window.axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v => ({id:v.id, targets:v.nodes.map(n => n.target)})));
        const filename = route === '/' ? 'home' : route === '/projects' ? 'projects' : route.split('/').pop();
        await page.screenshot({path:`output/playwright/remaining-projects/${filename}-${width}.png`, fullPage:true});
        const feature = page.locator('.refined-project .case-feature');
        if (await feature.count()) await feature.screenshot({path:`output/playwright/remaining-projects/${filename}-overview-${width}.png`});
      }
      const compiler = page.getByRole('group',{name:'Semantic pass',exact:true});
      if (await compiler.count()) {
        const codes = ['function name → signature','identifier use → declaration','call arguments ↔ parameter types','break → enclosing loop'];
        for (let index=0;index<4;index++) {
          const button = compiler.getByRole('button').nth(index);
          await button.focus(); await page.keyboard.press(index%2 ? 'Enter':'Space');
          const figure = compiler.locator('..');
          const selected = await button.getAttribute('aria-pressed') === 'true';
          const content = await figure.locator('.pass-explanation code').innerText();
          const focused = await button.evaluate(element => document.activeElement === element && getComputedStyle(element).outlineStyle !== 'none');
          interactions.push({route,width,kind:'compiler-pass',index,pass:selected && content === codes[index] && focused});
        }
      }
      const temperature = page.getByRole('group',{name:'Temperature relative to target',exact:true});
      if (await temperature.count()) {
        const expected = [['On','Off'],['Off','Off'],['Off','On']];
        for (let index=0;index<3;index++) {
          const button = temperature.getByRole('button').nth(index);
          await button.focus(); await page.keyboard.press(index%2 ? 'Enter':'Space');
          const states = await temperature.locator('..').locator('dd').allTextContents();
          interactions.push({route,width,kind:'temperature-rule',index,pass:await button.getAttribute('aria-pressed') === 'true' && JSON.stringify(states)===JSON.stringify(expected[index])});
        }
      }
      if (route === '/') {
        const stages = page.locator('.v3-stage');
        for (let index=0;index<3;index++) {
          const button = stages.nth(index).getByRole('button');
          if (await button.getAttribute('aria-expanded') === 'true') await button.click();
          await button.focus(); await page.keyboard.press('Enter');
          interactions.push({route,width,kind:'homepage-compiler',index,pass:await button.getAttribute('aria-expanded') === 'true' && await stages.nth(index).locator('p').isVisible()});
        }
      }
      if (route === '/projects') {
        const filters = page.getByRole('group',{name:'Filter projects by category'});
        const names = await filters.getByRole('button').allTextContents();
        const counts = {All:9,Distributed:1,ML:3,Embedded:1,'Full-Stack':1,Systems:2,Frontend:1};
        for (const name of names) {
          await filters.getByRole('button',{name,exact:true}).click();
          interactions.push({route,width,kind:`filter-${name}`,pass:await page.locator('.collection-project').count() === counts[name]});
        }
        await filters.getByRole('button',{name:'All',exact:true}).click();
      }
      results.push({route,width,status:response.status(),...state,violations});
    }
  }
  const linkResults=[];
  for (const link of links) {
    const response = await page.request.get(base+link);
    linkResults.push({link,status:response.status()});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(base+'/projects/climate-control-simulation');
  await page.getByRole('button',{name:'Above band',exact:true}).click();
  const reducedMotion = (await page.locator('.actuator-states dd').allTextContents()).join(',') === 'Off,On';
  const context = await page.context().browser().newContext({javaScriptEnabled:false});
  const staticPage = await context.newPage();
  await staticPage.goto(base+'/projects/j-minus-minus-mips-compiler');
  const ssr = await staticPage.locator('#backend').isVisible() && (await staticPage.locator('.pass-explanation').innerText()).includes('scope stack');
  await context.close();
  const modified = result => !['/experience/snap-remedy','/projects/distributed-chat-system'].includes(result.route);
  const pass = !errors.length && reducedMotion && ssr && interactions.every(i=>i.pass) && linkResults.every(link=>link.status===200) && results.every(result=>result.status===200 && result.h1Count===1 && !result.horizontalOverflow && !result.clipped.length && !result.duplicateIds.length && !result.brokenAnchors.length && result.images.every(image=>image.loaded && image.alt) && !result.violations.length && (!modified(result) || !result.route.startsWith('/projects/') || result.tools && result.canonical.endsWith(result.route) && !result.sections.some(title=>/reflections|limitations/i.test(title))));
  return {pass,results,interactions,linkResults,errors,reducedMotion,ssr};
}
