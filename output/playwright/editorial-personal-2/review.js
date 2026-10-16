async (page) => {
  const errors=[],warnings=[],failedResponses=[],responsive=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)failedResponses.push({status:r.status(),url:r.url()});});
  await page.reload();
  for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
    await page.setViewportSize({width,height});
    await page.evaluate(async()=>{await document.fonts.ready;document.querySelector('.personal-note').scrollIntoView({block:'center',behavior:'instant'});});
    await page.locator('.personal-note img').evaluate(async img=>{await img.decode();});
    await page.screenshot({path:'output/playwright/editorial-personal-2/'+name+'-note.png',animations:'disabled'});
    responsive.push(await page.evaluate(()=>{const img=document.querySelector('.personal-note img'),r=img.getBoundingClientRect();return {width:innerWidth,pageWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,imageWidth:r.width,imageHeight:r.height,naturalWidth:img.naturalWidth,currentSrc:img.currentSrc,alt:img.alt,copy:document.querySelector('.personal-note-copy').textContent,robots:document.querySelector('meta[name="robots"]')?.content};}));
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.screenshot({path:'output/playwright/editorial-personal-2/'+name+'-full.png',fullPage:true,animations:'disabled'});
  }
  await page.setViewportSize({width:320,height:844});
  const narrow=await page.evaluate(()=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
  await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const footerLinksVisible=await page.locator('footer a').evaluateAll(nodes=>nodes.every(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=document.documentElement.clientWidth&&r.bottom<=innerHeight+1;}));
  await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>document.querySelector('.personal-note').scrollIntoView({block:'center',behavior:'instant'}));
  return {responsive,narrow,footerLinksVisible,errors,warnings,failedResponses};
}
