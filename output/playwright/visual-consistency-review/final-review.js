async (page) => {
  const base='http://127.0.0.1:3000',label='dev',checks=[],layouts=[],accessibility=[],errors=[];
  const check=(name,pass,detail)=>checks.push({name,pass,detail});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const width of [1440,768,390,320]) {
    await page.setViewportSize({width,height:1000});
    for(const [name,route] of [['home','/'],['projects','/projects'],['experience','/experience']]) {
      const response=await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
      if(name==='home') {await page.locator('.personal-note').scrollIntoViewIfNeeded();await page.locator('.personal-note img').evaluateAll(images=>Promise.all(images.map(i=>i.decode())));}
      const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,clipped:[...document.querySelectorAll('main h1,main h2,main h3,main p,main pre,main code,main button')].filter(n=>getComputedStyle(n).display!=='inline'&&n.scrollWidth>n.clientWidth+1).map(n=>n.textContent.slice(0,80))}));
      layouts.push({width,route,...layout});check(`Layout ${route} ${width}`,response.status()===200&&!layout.overflow&&!layout.clipped.length,layout);
      await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
      const violations=await page.evaluate(async()=>(await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
      accessibility.push({width,route,violations});
      if(width!==320) {await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`output/playwright/visual-consistency-review/after-${label}-${name}-${width}.png`,fullPage:true});}
    }
  }
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');
  const heroLink=page.locator('.v3-hero-current a');await heroLink.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  check('Hero case-study link is underlined and visibly focused',await heroLink.evaluate(el=>el===document.activeElement&&el.matches(':focus-visible')&&getComputedStyle(el).outlineStyle!=='none'&&getComputedStyle(el).textDecorationLine.includes('underline')));
  await page.keyboard.press('Enter');await page.waitForURL(base+'/experience/snap-remedy');check('Hero link reaches Snap Remedy case study',await page.locator('h1').textContent()==='ERP integration and product ranking');
  await page.goto(base+'/projects');
  const categories=[['Distributed',1],['ML',2],['Systems',2],['Algorithms',1],['Full-Stack',1],['Embedded',1],['Frontend',1],['All',9]];
  for(const [category,count] of categories) {const b=page.getByRole('button',{name:category,exact:true});await b.focus();await page.keyboard.press('Space');check(`Keyboard filter ${category}`,await page.locator('.collection-project').count()===count&&await b.getAttribute('aria-pressed')==='true');}
  for(const label of ['Below band','Inside band','Above band']) {const b=page.getByRole('button',{name:label,exact:true});await b.focus();await page.keyboard.press('Enter');check(`Greenhouse controls ${label}`,await b.getAttribute('aria-pressed')==='true');}
  const projectLinks=await page.locator('.collection-copy h2 a').evaluateAll(nodes=>nodes.map(a=>({title:a.textContent,href:a.getAttribute('href')})));
  check('Every project has a distinct detail link',projectLinks.length===9&&new Set(projectLinks.map(p=>p.href)).size===9);
  await page.getByRole('link',{name:'Explore the interactive architecture',exact:true}).click();await page.waitForURL(base+'/projects/distributed-chat-system#architecture');
  const chat=page.locator('.chat-architecture');for(const name of ['Discovery','Messages','Coordination','Failure & election']) {const b=chat.getByRole('button',{name,exact:true});await b.focus();await page.keyboard.press('Space');check(`Full chat control ${name}`,await b.getAttribute('aria-pressed')==='true');}
  for(const stage of ['1. Primary lost','2. Election','3. New primary']) {const b=chat.getByRole('button',{name:stage,exact:true});await b.focus();await page.keyboard.press('Enter');check(`Election stage ${stage}`,await b.getAttribute('aria-pressed')==='true');}
  await chat.getByRole('button',{name:'Messages',exact:true}).click();for(const n of ['1','2']) {await chat.getByRole('group',{name:'Gossip fan-out'}).getByRole('button',{name:n,exact:true}).click();check(`Chat fan-out ${n}`,await chat.getAttribute('data-fanout')===n);}
  await page.goto(base+'/experience');
  for(const id of ['snap-remedy','pro-formance-intermodal','phillys']) {const a=page.locator(`.experience-index a[href="#${id}"]`);await a.scrollIntoViewIfNeeded();await a.evaluate(el=>el.focus({preventScroll:true}));await page.keyboard.press('Enter');await page.waitForFunction(id=>Math.abs(document.getElementById(id).getBoundingClientRect().top-105)<4,id);check(`Experience anchor ${id}`,page.url().endsWith('#'+id));}
  await page.getByRole('link',{name:'View my résumé',exact:true}).click();await page.waitForURL(base+'/resume');check('Résumé navigation works',await page.locator('h1').textContent()==='Résumé');
  await page.goto(base+'/');await page.setViewportSize({width:390,height:844});const menu=page.getByRole('button',{name:'Menu',exact:true});await menu.focus();await page.keyboard.press('Enter');await page.keyboard.press('Escape');check('Mobile menu and Escape preserve keyboard focus',await menu.evaluate(el=>el===document.activeElement)&&await menu.getAttribute('aria-expanded')==='false');
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.v3-hero-current a').focus();await page.keyboard.press('Enter');await page.waitForURL(base+'/experience/snap-remedy');check('Reduced-motion navigation works',await page.locator('h1').textContent()==='ERP integration and product ranking');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');
  check('Accessibility audits pass',accessibility.every(a=>!a.violations.length));check('No browser errors',!errors.length,errors);
  return {label,checks,layouts,accessibility,errors};
}
