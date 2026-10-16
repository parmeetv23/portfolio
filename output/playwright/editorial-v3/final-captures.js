async (page) => {
  const evidence=[];
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:3000/design-lab/editorial-v3');
  for(const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844]]){
    await page.setViewportSize({width,height});
    await page.evaluate(async()=>{await document.fonts.ready;window.scrollTo({top:0,behavior:'instant'});await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
    await page.screenshot({path:'output/playwright/editorial-v3/'+name+'.png',animations:'disabled'});
    await page.screenshot({path:'output/playwright/editorial-v3/'+name+'-full.png',fullPage:true,animations:'disabled'});
    await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
    await page.waitForFunction(()=>document.querySelector('header a[href="#v3-contact"]').getAttribute('aria-current')==='location');
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('header a[href="#v3-contact"]'),'::after').transform==='matrix(1, 0, 0, 1, 0, 0)');
    await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
    await page.screenshot({path:'output/playwright/editorial-v3/'+name+'-footer.png',animations:'disabled'});
    evidence.push(await page.evaluate(()=>({width:innerWidth,viewportHeight:innerHeight,documentHeight:document.documentElement.scrollHeight,footerTop:document.querySelector('footer').getBoundingClientRect().top,footerBottom:document.querySelector('footer').getBoundingClientRect().bottom,allFooterLinksVisible:[...document.querySelectorAll('footer a')].every(el=>{const r=el.getBoundingClientRect();return r.top>=document.querySelector('header').getBoundingClientRect().bottom&&r.bottom<=innerHeight+1;}),currentNavigation:document.querySelector('header nav a[aria-current]')?.textContent,canvas:getComputedStyle(document.documentElement).backgroundColor})));
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  return evidence;
}
