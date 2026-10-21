async (page) => {
  const base='http://127.0.0.1:3000', checks=[], layouts=[], accessibility=[], errors=[];
  const check=(name,pass,detail)=>checks.push({name,pass,detail});
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const width of [1440,1024,768,390,320]) {
    await page.setViewportSize({width,height:1000});await page.goto(base+'/experience');await page.evaluate(()=>document.fonts.ready);
    const layout=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,clipped:[...document.querySelectorAll('.experience-story h2,.experience-story h3,.experience-story p,.experience-story li')].filter(n=>n.scrollWidth>n.clientWidth+1).map(n=>n.textContent),entries:[...document.querySelectorAll('.experience-story')].map(n=>({id:n.id,height:Math.round(n.getBoundingClientRect().height),sections:n.querySelectorAll('.experience-contributions section').length,summary:n.querySelector('.experience-content > p').textContent,techGap:Math.round(n.querySelector('.technology-list').getBoundingClientRect().top-(n.querySelector('.experience-contributions').getBoundingClientRect().bottom)),headingFont:getComputedStyle(n.querySelector('.experience-contributions h3')).fontSize,paragraphFont:getComputedStyle(n.querySelector('.experience-contributions p')).fontSize}))}));
    layouts.push({width,...layout});check(`No overflow or text clipping at ${width}`,!layout.overflow&&!layout.clipped.length,layout.clipped);
    check(`Shared contribution typography at ${width}`,new Set(layout.entries.map(e=>e.headingFont)).size===1&&new Set(layout.entries.map(e=>e.paragraphFont)).size===1);
    check(`Natural section counts at ${width}`,layout.entries.map(e=>e.sections).join(',')==='3,3,2');
    check(`Snap Remedy remains longest entry at ${width}`,layout.entries[0].height>layout.entries[1].height&&layout.entries[1].height>layout.entries[2].height);
    check(`Technology labels have breathing room at ${width}`,layout.entries.every(e=>e.techGap>=28));
    check(`Summary and employer spacing at ${width}`,await page.locator('.experience-story').evaluateAll(nodes=>nodes.every(n=>getComputedStyle(n.querySelector('.experience-content > p')).marginBottom==='30px'&&getComputedStyle(n.querySelector('.experience-meta h2')).marginTop==='23px')));
    check(`No legacy contribution bullet lists at ${width}`,await page.locator('.experience-content .reading-list').count()===0);
    await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
    const violations=await page.evaluate(async()=>(await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
    accessibility.push({width,violations});
    await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`output/playwright/experience-editorial/after-${width}.png`,fullPage:true});
    for(const id of ['snap-remedy','pro-formance-intermodal','phillys']) {
      const target=page.getByRole('navigation',{name:'Jump to employer'}).locator(`a[href="#${id}"]`);
      await target.scrollIntoViewIfNeeded();await target.evaluate(el=>el.focus({preventScroll:true}));await page.keyboard.press('Enter');
      check(`Employer keyboard jump ${width}: ${id}`,page.url().endsWith('#'+id));
      await page.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top-105)<4,id);
      check(`Employer heading clears header ${width}: ${id}`,await page.locator('#'+id).evaluate(el=>el.getBoundingClientRect().top>=65));
    }
  }
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/experience');
  await page.locator('#snap-remedy').screenshot({path:'output/playwright/experience-editorial/snap-after.png'});
  const snapLink=page.getByRole('link',{name:'Read the engineering case study',exact:true});await snapLink.focus();await page.keyboard.press('Enter');await page.waitForURL(base+'/experience/snap-remedy');
  check('Existing Snap Remedy case-study link works',await page.locator('main h1').textContent()==='ERP integration and product ranking');
  await page.goto(base+'/experience');await page.getByRole('link',{name:'View my résumé',exact:true}).click();await page.waitForURL(base+'/resume');
  check('Résumé link works',await page.locator('h1').textContent()==='Résumé');
  for(const [name,path] of [['Home','/'],['Projects','/projects'],['Experience','/experience']]) {
    await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name,exact:true}).click();await page.waitForURL(base+path);
    check(`Primary navigation ${name}`,await page.locator('main').count()===1);
  }
  await page.goto(base+'/');await page.locator('.v3-previous-roles').screenshot({path:'output/playwright/experience-editorial/home-roles-after.png'});
  await page.goto(base+'/experience');await page.setViewportSize({width:390,height:844});
  const menu=page.getByRole('button',{name:'Menu',exact:true});await menu.focus();await page.keyboard.press('Enter');
  await page.getByRole('button',{name:'Close',exact:true}).focus();await page.keyboard.press('Escape');
  check('Mobile menu closes and restores keyboard focus',await menu.evaluate(el=>el===document.activeElement)&&await menu.getAttribute('aria-expanded')==='false');
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
  await page.getByRole('navigation',{name:'Jump to employer'}).getByRole('link',{name:'PRO-Formance Intermodal',exact:false}).click();
  check('Employer navigation works with reduced motion',page.url().endsWith('#pro-formance-intermodal'));
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/experience');
  check('Accessibility audits pass',accessibility.every(a=>!a.violations.length));check('No browser errors',!errors.length,errors);
  return {checks,layouts,accessibility,errors};
}
