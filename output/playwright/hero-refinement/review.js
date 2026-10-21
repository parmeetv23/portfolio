async (page) => {
  const results=[],errors=[],checks=[];
  const check=(name,pass)=>checks.push({name,pass});
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto('http://127.0.0.1:3000/');await page.evaluate(()=>document.fonts.ready);
  await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
  for(const width of [1440,1024,768,390,320]) {
    await page.setViewportSize({width,height:1200});await page.evaluate(()=>window.scrollTo(0,0));
    const link=page.locator('.v3-hero-current a');
    const layout=await page.locator('.v3-hero').evaluate(el=>{const a=el.querySelector('.v3-hero-current a'),p=el.querySelector('.v3-introduction');return {introduction:p.textContent.trim(),href:a.getAttribute('href'),underline:getComputedStyle(a).textDecorationLine,nowrap:getComputedStyle(a).whiteSpace,overflow:document.documentElement.scrollWidth>innerWidth,clipped:[...el.querySelectorAll('p,a')].filter(n=>n.scrollWidth>n.clientWidth+1&&getComputedStyle(n).display!=='inline').map(n=>n.textContent)};});
    check(`Hero layout ${width}`,!layout.overflow&&!layout.clipped.length);
    check(`Visible case-study link ${width}`,layout.href==='/experience/snap-remedy'&&layout.underline.includes('underline')&&layout.nowrap==='nowrap');
    await link.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
    check(`Keyboard focus ${width}`,await link.evaluate(el=>el===document.activeElement&&el.matches(':focus-visible')&&getComputedStyle(el).outlineStyle!=='none'));
    await link.evaluate(el=>el.blur());
    await page.locator('.v3-hero').screenshot({path:`output/playwright/hero-refinement/after-${width}.png`});
    const violations=await page.evaluate(async()=>(await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id));
    results.push({width,...layout,violations});
  }
  const link=page.locator('.v3-hero-current a');await link.focus();await page.keyboard.press('Enter');await page.waitForURL('http://127.0.0.1:3000/experience/snap-remedy');
  check('Keyboard activation opens Snap Remedy case study',await page.locator('h1').textContent()==='ERP integration and product ranking');
  await page.goBack();await page.waitForURL('http://127.0.0.1:3000/');
  await page.locator('.v3-hero-current a').click();await page.waitForURL('http://127.0.0.1:3000/experience/snap-remedy');
  check('Click opens Snap Remedy case study',await page.locator('h1').textContent()==='ERP integration and product ranking');
  await page.goto('http://127.0.0.1:3000/');await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('.v3-hero-current a').focus();await page.keyboard.press('Enter');await page.waitForURL('http://127.0.0.1:3000/experience/snap-remedy');
  check('Case-study navigation works with reduced motion',await page.locator('h1').textContent()==='ERP integration and product ranking');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:3000/');
  check('Accessibility audits pass',results.every(r=>!r.violations.length));check('No browser errors',!errors.length);
  return {checks,results,errors};
}
