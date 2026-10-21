async (page) => {
  const base='http://127.0.0.1:3000', label='dev', results=[], errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  for(const width of [1440,768,390,320]) {
    await page.setViewportSize({width,height:1000});
    for(const [name,route] of [['home','/'],['projects','/projects'],['experience','/experience']]) {
      await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);
      const data=await page.evaluate(()=>({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,muted:getComputedStyle(document.querySelector('.portfolio')).getPropertyValue('--v3-muted'),clipped:[...document.querySelectorAll('main h1,main h2,main h3,main p,main pre,main code,main button')].filter(n=>getComputedStyle(n).display!=='inline'&&n.scrollWidth>n.clientWidth+1).map(n=>({text:n.textContent.slice(0,120),class:n.className})),styles:[...document.querySelectorAll('.collection-copy h2,.collection-summary,.gallery-heading,.experience-content > p,.experience-meta h2,.v3-project-description h3,.v3-hero .v3-introduction')].map(n=>({text:n.textContent.slice(0,65),font:getComputedStyle(n).fontSize,weight:getComputedStyle(n).fontWeight,top:getComputedStyle(n).marginTop,bottom:getComputedStyle(n).marginBottom})),images:[...document.querySelectorAll('main img')].map(i=>({src:i.getAttribute('src'),complete:i.complete,alt:!!i.alt}))}));
      if(width!==320) {await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`output/playwright/visual-consistency-review/before-${label}-${name}-${width}.png`,fullPage:true});}
      await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
      const violations=await page.evaluate(async()=>(await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
      results.push({width,route,...data,violations});
    }
  }
  await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');
  return {label,results,errors};
}
