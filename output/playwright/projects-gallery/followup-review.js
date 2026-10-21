async (page) => {
  const base='http://127.0.0.1:3000', checks=[], accessibility=[], layouts=[], errors=[];
  const check=(name,pass,detail)=>checks.push({name,pass,detail});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const width of [1440,768,390,320]) {
    await page.setViewportSize({width,height:1000});
    for(const route of ['/','/projects']) {
      await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
      const layout=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,clipped:[...document.querySelectorAll('.gallery-preview p,.gallery-preview code,.gallery-preview figcaption,.collection-copy h2,.v3-project-description h3')].filter(n=>n.scrollWidth>n.clientWidth+1).map(n=>n.textContent)}));
      layouts.push({width,route,...layout});
      check(`Layout ${route} ${width}`,!layout.overflow&&!layout.clipped.length,layout);
      if(route==='/') {
        check(`Homepage uses three compact figures ${width}`,await page.locator('#v3-work .gallery-preview').count()===3&&await page.locator('#v3-work .chat-architecture,#v3-work .pet-pipeline,#v3-work .compiler-example').count()===0);
        for(const href of ['/projects/distributed-chat-system','/projects/occluded-pet-detection','/projects/j-minus-minus-mips-compiler']) check(`Homepage project link ${width} ${href}`,await page.locator(`#v3-work a[href="${href}"]`).count()>0);
        check(`Snap Remedy illustration retained ${width}`,await page.locator('.snap-architecture').count()===1);
      } else {
        check(`Restaurant architecture visible ${width}`,await page.locator('.collection-restaurant .gallery-restaurant').count()===1);
        const filter=page.getByRole('button',{name:'Full-Stack',exact:true});await filter.focus();await page.keyboard.press('Space');
        check(`Restaurant category keyboard filter ${width}`,await page.locator('.collection-project').count()===1&&await page.locator('.gallery-restaurant').isVisible());
        const filtered=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);check(`Filtered architecture fits ${width}`,filtered);
        await page.locator('.collection-restaurant').screenshot({path:`output/playwright/projects-gallery/restaurant-filter-${width}.png`});
        await page.getByRole('link',{name:'Explore project',exact:true}).click();await page.waitForURL(base+'/projects/fullstack-restaurant-system');
        check(`Restaurant project link ${width}`,await page.locator('h1').textContent()==='Restaurant Reservation System');
        await page.goto(base+'/projects');
      }
      await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
      const violations=await page.evaluate(async()=>(await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
      accessibility.push({width,route,violations});
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  for(const slug of ['distributed-chat-system','occluded-pet-detection','j-minus-minus-mips-compiler','genetic-algorithm-hyperparameter-finder','raspberry-pi-bare-metal']) {
    await page.goto(base+'/projects/'+slug);await page.evaluate(()=>document.fonts.ready);
    await page.locator('main figure').first().screenshot({path:`output/playwright/projects-gallery/followup-case-${slug}.png`});
  }
  await page.goto(base+'/');await page.emulateMedia({reducedMotion:'reduce'});
  check('Compact homepage figures remain static under reduced motion',await page.locator('#v3-work .gallery-preview').evaluateAll(nodes=>nodes.every(n=>n.getAnimations({subtree:true}).every(a=>a.playState!=='running'))));
  await page.getByRole('link',{name:'Explore the interactive architecture',exact:true}).focus();await page.keyboard.press('Enter');await page.waitForURL(base+'/projects/distributed-chat-system#architecture');
  await page.getByRole('button',{name:'Coordination',exact:true}).focus();await page.keyboard.press('Space');
  check('Homepage architecture link reaches working full interaction',await page.locator('.chat-architecture').getAttribute('data-flow')==='coordination');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(base+'/');
  check('Axe accessibility audits pass',accessibility.every(a=>!a.violations.length));check('No browser errors',!errors.length,errors);
  return {checks,accessibility,layouts,errors};
}
