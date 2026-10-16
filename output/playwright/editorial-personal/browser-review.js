async (page) => {
  const checks=[],errors=[],warnings=[],failedResponses=[],images=[],geometry={},responsive=[],footerResults=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)failedResponses.push({status:r.status(),url:r.url()});});
  const check=(name,pass)=>{checks.push({name,pass});if(!pass)throw new Error(name);};
  const settle=()=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
  const measure=()=>page.evaluate(()=>Object.fromEntries(['.v3-hero','.v3-experience','.v3-project-grid','.v3-project-strip'].map(selector=>{const el=document.querySelector(selector),r=el.getBoundingClientRect();return [selector,{x:r.x,y:r.y+scrollY,width:r.width,height:r.height,text:el.textContent}];})));
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('http://127.0.0.1:3000/design-lab/editorial-v3');await settle();geometry.v3=await measure();
  await page.goto('http://127.0.0.1:3000/design-lab/editorial-personal');await settle();geometry.personal=await measure();
  check('Professional text is identical to V3',Object.keys(geometry.v3).every(key=>geometry.v3[key].text===geometry.personal[key].text));
  check('Professional layout matches V3 within one pixel',Object.keys(geometry.v3).every(key=>['x','y','width','height'].every(d=>Math.abs(geometry.v3[key][d]-geometry.personal[key][d])<=1)));
  check('One personal note follows Projects and precedes Contact',await page.evaluate(()=>{const note=document.querySelector('.personal-note'),work=document.querySelector('#v3-work'),footer=document.querySelector('footer');return document.querySelectorAll('.personal-note').length===1&&!!(work.compareDocumentPosition(note)&Node.DOCUMENT_POSITION_FOLLOWING)&&!!(note.compareDocumentPosition(footer)&Node.DOCUMENT_POSITION_FOLLOWING);}));
  check('Personal copy includes the supplied interests',await page.locator('.personal-note-copy').textContent().then(s=>['Kananaskis','Alberta','basketball'].every(word=>s.includes(word))));
  check('Personal image is lazy loaded with explicit dimensions',await page.locator('.personal-note img').evaluate(el=>el.loading==='lazy'&&el.getAttribute('width')==='960'&&el.getAttribute('height')==='720'&&el.alt.length>20));
  check('Original photographs are not referenced by this page',await page.evaluate(()=>[...document.images].every(el=>!el.src.includes('ChatGPT'))));
  await page.keyboard.press('Tab');
  check('Skip link remains first in keyboard order',await page.locator('.lab-skip').evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Enter');
  check('Skip link focuses main content',await page.locator('main').evaluate(el=>el===document.activeElement));
  await page.getByRole('radio',{name:'Interfaces',exact:true}).check();
  check('Reused application selector remains functional',await page.getByRole('heading',{name:'React dashboards',exact:true}).isVisible());
  await page.keyboard.press('ArrowRight');
  check('Reused radio selection remains keyboard accessible',await page.getByRole('radio',{name:'Services',exact:true}).isChecked());
  await page.getByRole('radio',{name:'Overview',exact:true}).check();
  await page.getByRole('button',{name:'Parse',exact:true}).click();
  check('Reused compiler interaction remains functional',await page.locator('#v3-stage-0').isVisible());
  await page.getByRole('button',{name:'Resolve',exact:true}).click();
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:width<600?844:1000});await settle();
    await page.locator('.personal-note').scrollIntoViewIfNeeded();
    await page.locator('.personal-note img').evaluate(async el=>{await el.decode();});
    const result=await page.evaluate(()=>{const image=document.querySelector('.personal-note img'),r=image.getBoundingClientRect();return {width:innerWidth,clientWidth:document.documentElement.clientWidth,pageWidth:document.documentElement.scrollWidth,noteHeight:document.querySelector('.personal-note').getBoundingClientRect().height,imageWidth:r.width,imageHeight:r.height,currentSrc:image.currentSrc,naturalWidth:image.naturalWidth,alt:image.alt,mainCount:document.querySelectorAll('main').length,h1Count:document.querySelectorAll('h1').length,robots:document.querySelector('meta[name="robots"]')?.content};});
    responsive.push(result);images.push({width,currentSrc:result.currentSrc});
    check('No horizontal page overflow at '+width+'px',result.pageWidth<=result.clientWidth);
    check('Photo loads without cropping at '+width+'px',result.naturalWidth>0&&Math.abs(result.imageWidth/result.imageHeight-4/3)<.01);
    check('One main and one h1 at '+width+'px',result.mainCount===1&&result.h1Count===1);
  }
  await page.setViewportSize({width:1440,height:1000});await settle();
  await page.getByRole('navigation',{name:'Portfolio navigation',exact:true}).getByRole('link',{name:'Contact',exact:true}).click();
  await page.waitForFunction(()=>scrollY+innerHeight>=document.documentElement.scrollHeight-2);
  check('Contact navigation still reaches the complete footer',await page.locator('header a[href="#v3-contact"]').getAttribute('aria-current')==='location');
  await page.emulateMedia({reducedMotion:'reduce'});await settle();
  check('Photo has no added animation under reduced motion',await page.locator('.personal-note img').evaluate(el=>getComputedStyle(el).animationName==='none'&&getComputedStyle(el).transform==='none'));
  check('Inherited reduced-motion handling remains active',await page.locator('.v3-app-interface').evaluate(el=>getComputedStyle(el).transform==='none'&&getComputedStyle(el).transitionDuration==='0s'));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.reload();await settle();
  for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
    await page.setViewportSize({width,height});await settle();
    await page.evaluate(()=>document.querySelector('.personal-note').scrollIntoView({block:'center',behavior:'instant'}));
    await page.locator('.personal-note img').evaluate(async el=>{await el.decode();});await settle();
    await page.screenshot({path:'output/playwright/editorial-personal/'+name+'-note.png',animations:'disabled'});
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await settle();
    await page.screenshot({path:'output/playwright/editorial-personal/'+name+'.png',animations:'disabled'});
    let before=0,after=0;
    for(let attempt=0;attempt<3;attempt++){
      before=await page.evaluate(()=>document.documentElement.scrollHeight);
      await page.screenshot({path:'output/playwright/editorial-personal/'+name+'-full.png',fullPage:true,animations:'disabled'});
      after=await page.evaluate(()=>document.documentElement.scrollHeight);
      if(Math.abs(before-after)<2)break;await settle();
    }
    check(name+' full-page capture has settled height',Math.abs(before-after)<2);
    await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await settle();
    await page.waitForFunction(()=>document.querySelector('header a[href="#v3-contact"]').getAttribute('aria-current')==='location');
    await page.screenshot({path:'output/playwright/editorial-personal/'+name+'-footer.png',animations:'disabled'});
    const footer=await page.evaluate(()=>({width:innerWidth,linksVisible:[...document.querySelectorAll('footer a')].every(el=>{const r=el.getBoundingClientRect();return r.top>=document.querySelector('header').getBoundingClientRect().bottom&&r.bottom<=innerHeight+1;}),bottom:document.querySelector('footer').getBoundingClientRect().bottom}));footerResults.push(footer);
    check(name+' footer links remain visible',footer.linksVisible);
  }
  const assetResponses=[];
  for(const path of ['/images/editorial-personal/alpine-lake-480.webp','/images/editorial-personal/alpine-lake-960.webp','/images/editorial-personal/alpine-lake-960.jpg']){const response=await page.request.get('http://127.0.0.1:3000'+path);assetResponses.push({path,status:response.status(),contentType:response.headers()['content-type']});}
  check('All optimized image assets return HTTP 200',assetResponses.every(r=>r.status===200));
  const staticContext=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),staticPage=await staticContext.newPage();
  await staticPage.goto('http://127.0.0.1:3000/design-lab/editorial-personal');await staticPage.locator('.personal-note').scrollIntoViewIfNeeded();
  await staticPage.waitForFunction(()=>document.querySelector('.personal-note img').complete);
  check('Personal content and image work without JavaScript',await staticPage.locator('#personal-note-title').isVisible()&&await staticPage.locator('.personal-note img').evaluate(el=>el.naturalWidth>0));await staticContext.close();
  await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>document.querySelector('.personal-note').scrollIntoView({block:'center',behavior:'instant'}));
  return {checks,responsive,images,footerResults,assetResponses,errors,warnings,failedResponses,professionalComparison:geometry};
}
