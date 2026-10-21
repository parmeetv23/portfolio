async (page) => {
  const base = 'http://127.0.0.1:3000';
  const checks = [], layouts = [], accessibility = [], errors = [], responses = [];
  const check = (name, pass, detail) => checks.push({name, pass, detail});
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const audit = async (route, width) => {
    await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
    const violations = await page.evaluate(async () => (await window.axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v => ({id:v.id, impact:v.impact, nodes:v.nodes.map(n => n.target)})));
    accessibility.push({route,width,violations});
  };
  await page.goto(base+'/projects');
  for (const width of [1440,1024,768,390,320]) {
    await page.setViewportSize({width,height:1000});
    await page.evaluate(()=>document.fonts.ready);
    const layout = await page.evaluate(()=>({height:document.documentElement.scrollHeight, width:innerWidth, scrollWidth:document.documentElement.scrollWidth, clipped:[...document.querySelectorAll('.collection-project p,.collection-project code,.collection-project button,.collection-project figcaption')].filter(n=>n.scrollWidth>n.clientWidth+1).map(n=>n.textContent), figures:[...document.querySelectorAll('.collection-project')].map(a=>({title:a.querySelector('h2').textContent,height:Math.round(a.querySelector('figure')?.getBoundingClientRect().height||0)}))}));
    layouts.push({width,...layout});
    check(`Layout fits at ${width}`,layout.scrollWidth<=width && layout.clipped.length===0,layout.clipped);
    await page.screenshot({path:`output/playwright/projects-gallery/after-${width}.png`,fullPage:true});
    await audit('/projects',width);
  }
  await page.setViewportSize({width:1440,height:1000});
  const filters=page.getByRole('group',{name:'Filter projects by category'});
  for (const [category,count] of [['Distributed',1],['ML',2],['Systems',2],['Algorithms',1],['Full-Stack',1],['Embedded',1],['Frontend',1],['All',9]]) {
    const button=filters.getByRole('button',{name:category,exact:true});
    await button.focus(); await page.keyboard.press('Space');
    check(`Keyboard category ${category}`,await page.locator('.collection-project').count()===count && await button.getAttribute('aria-pressed')==='true',await page.getByRole('status').textContent());
    check(`Visible focus ${category}`,await button.evaluate(el=>getComputedStyle(el).outlineStyle!=='none'));
  }
  const temperature=page.getByRole('group',{name:'Temperature relative to target'});
  for (const label of ['Below band','Inside band','Above band']) {
    const button=temperature.getByRole('button',{name:label});
    await button.focus(); await page.keyboard.press('Enter');
    check(`Listing greenhouse: ${label}`,await button.getAttribute('aria-pressed')==='true');
  }
  await temperature.getByRole('button',{name:'Inside band'}).click();
  await page.getByRole('link',{name:'Explore the interactive architecture',exact:true}).click();
  await page.waitForURL(base+'/projects/distributed-chat-system#architecture');
  check('Architecture preview link reaches full diagram',await page.locator('#architecture .chat-architecture:not(.chat-architecture-compact)').isVisible());
  const chat=page.locator('.chat-architecture');
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    for (const label of ['Discovery','Messages','Coordination','Failure & election']) {
      const button=chat.getByRole('button',{name:label,exact:true});
      await button.focus(); await page.keyboard.press('Space');
      check(`Chat keyboard ${width}: ${label}`,await button.getAttribute('aria-pressed')==='true');
      if(label==='Messages') for(const fanout of ['1','2']) {
        await chat.getByRole('group',{name:'Gossip fan-out'}).getByRole('button',{name:fanout,exact:true}).click();
        check(`Chat fanout ${width}: ${fanout}`,await chat.getAttribute('data-fanout')===fanout);
      }
      if(label==='Failure & election') for(const stage of ['1. Primary lost','2. Election','3. New primary']) {
        const control=chat.getByRole('button',{name:stage,exact:true});
        await control.focus(); await page.keyboard.press('Enter');
        check(`Election ${width}: ${stage}`,await control.getAttribute('aria-pressed')==='true');
      }
    }
  }
  const slugs=['home','distributed-chat-system','occluded-pet-detection','j-minus-minus-mips-compiler','genetic-algorithm-hyperparameter-finder','raspberry-pi-bare-metal','ai-scheduling-hard-constraints','fullstack-restaurant-system','climate-control-simulation','family-streaming-interface'];
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    for(const slug of slugs) {
      const route=slug==='home' ? '/' : '/projects/'+slug;
      const response=await page.goto(base+route);
      await page.evaluate(()=>document.fonts.ready);
      responses.push({width,route,status:response.status()});
      check(`Route and overflow ${width}: ${route}`,response.status()===200 && await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      if(width===1440 && slugs.indexOf(slug)<6) await page.locator(slug==='home'?'main':'main figure').first().screenshot({path:`output/playwright/projects-gallery/after-${slug}.png`});
      if(slug==='home'||slugs.indexOf(slug)<6) await audit(route,width);
    }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'/projects');
  const menu=page.getByRole('button',{name:'Menu',exact:true});
  await menu.focus(); await page.keyboard.press('Enter');
  check('Mobile menu opens by keyboard',await page.getByRole('button',{name:'Close',exact:true}).getAttribute('aria-expanded')==='true');
  await page.keyboard.press('Escape');
  check('Mobile menu Escape restores focus',await menu.evaluate(el=>el===document.activeElement) && await menu.getAttribute('aria-expanded')==='false');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload();
  check('Reduced motion active',await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches));
  check('Static gallery previews have no running motion',await page.locator('.gallery-preview').evaluateAll(nodes=>nodes.every(n=>n.getAnimations({subtree:true}).every(a=>a.playState!=='running'))));
  await page.getByRole('button',{name:'Below band',exact:true}).click();
  check('Greenhouse works with reduced motion',await page.getByRole('button',{name:'Below band',exact:true}).getAttribute('aria-pressed')==='true');
  await page.getByRole('link',{name:'Explore the interactive architecture',exact:true}).click();
  await page.getByRole('button',{name:'Discovery',exact:true}).click();
  check('Full architecture works with reduced motion',await page.locator('.chat-architecture').getAttribute('data-flow')==='discovery');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(base+'/projects');
  await page.setViewportSize({width:1440,height:1000});
  check('No browser errors',errors.length===0,errors);
  check('Accessibility audits pass',accessibility.every(a=>a.violations.length===0));
  return {checks,layouts,accessibility,responses,errors};
}
