async (page) => {
  const errors=[],warnings=[],failedResponses=[],checks=[],footers=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());if(m.type()==='warning')warnings.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)failedResponses.push({status:r.status(),url:r.url()});});
  const check=(name,pass)=>{checks.push({name,pass});if(!pass)throw new Error(name);};
  const settle=()=>page.evaluate(async()=>{await document.fonts.ready;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
  const capture=async(name)=>{
    await page.screenshot({path:'output/playwright/editorial-v3/'+name+'.png',animations:'disabled'});
    let before=0,after=0;
    for(let attempt=0;attempt<3;attempt++){
      before=await page.evaluate(()=>document.documentElement.scrollHeight);
      await page.screenshot({path:'output/playwright/editorial-v3/'+name+'-full.png',fullPage:true,animations:'disabled'});
      after=await page.evaluate(()=>document.documentElement.scrollHeight);
      if(Math.abs(before-after)<2)break;
      await settle();
    }
    check(name+' capture has settled document height',Math.abs(before-after)<2);
  };
  await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:3000/design-lab/editorial-v3');await settle();
  check('Experience precedes projects in reading order',await page.evaluate(()=>!!(document.querySelector('#v3-experience').compareDocumentPosition(document.querySelector('#v3-work'))&Node.DOCUMENT_POSITION_FOLLOWING)));
  check('Hero states full-stack positioning',await page.locator('.v3-introduction').textContent().then(x=>x.includes('full-stack')));
  check('Hero has no employer-specific technical illustration',await page.locator('.v3-hero svg').count()===0);
  await page.keyboard.press('Tab');
  check('Skip link is first in keyboard order',await page.locator('.lab-skip').evaluate(el=>document.activeElement===el));
  check('Skip link has visible keyboard focus',await page.locator('.lab-skip').evaluate(el=>getComputedStyle(el).outlineStyle!=='none'));
  await page.keyboard.press('Enter');
  check('Skip link focuses the main landmark',await page.locator('main').evaluate(el=>el===document.activeElement));
  await page.getByRole('navigation',{name:'Portfolio navigation',exact:true}).getByRole('link',{name:'Experience',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('header a[href="#v3-experience"]').getAttribute('aria-current')==='location');
  await page.waitForFunction(()=>Math.abs(document.querySelector('#v3-experience').getBoundingClientRect().top-100)<3);
  check('Sticky header stays at the viewport top',await page.locator('header').evaluate(el=>Math.abs(el.getBoundingClientRect().top)<1));
  check('Experience anchor clears the header',await page.locator('#v3-experience').evaluate(el=>el.getBoundingClientRect().top>document.querySelector('header').getBoundingClientRect().bottom));
  const interfaces=page.getByRole('radio',{name:'Interfaces',exact:true});await interfaces.check();
  check('Interfaces selector changes the explanation',await page.getByRole('heading',{name:'React dashboards',exact:true}).isVisible());
  await interfaces.focus();await page.keyboard.press('ArrowRight');
  check('Native arrow keys select services',await page.getByRole('radio',{name:'Services',exact:true}).isChecked());
  check('Services selection changes the illustration',await page.locator('.v3-application-svg').getAttribute('class').then(x=>x.includes('v3-layer-services')));
  await page.locator('.v3-application-figure').screenshot({path:'output/playwright/editorial-v3/application-services.png',animations:'disabled'});
  await page.keyboard.press('ArrowRight');
  check('Data layer is keyboard accessible',await page.getByRole('heading',{name:'ETL and data integration',exact:true}).isVisible());
  await page.getByRole('radio',{name:'Overview',exact:true}).check();
  await page.locator('.v3-current-feature').screenshot({path:'output/playwright/editorial-v3/current-work.png',animations:'disabled'});
  await page.getByRole('navigation',{name:'Portfolio navigation',exact:true}).getByRole('link',{name:'Projects',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('header a[href="#v3-work"]').getAttribute('aria-current')==='location');
  check('Projects navigation follows scroll position',await page.locator('header a[href="#v3-work"]').getAttribute('aria-current')==='location');
  await page.waitForFunction(()=>Math.abs(document.querySelector('#v3-work').getBoundingClientRect().top-100)<3);
  await page.screenshot({path:'output/playwright/editorial-v3/desktop-project-navigation.png'});
  await page.getByRole('button',{name:'Trace a message',exact:true}).click();
  await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('.v3-network-packet')).opacity)>.5);
  check('Message tracing runs only after request',await page.getByRole('button',{name:'Trace again',exact:true}).isVisible());
  await page.locator('.v3-network').screenshot({path:'output/playwright/editorial-v3/message-trace.png'});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.v3-network-packet')).opacity==='0');
  check('Message animation stops after one traversal',await page.locator('.v3-network-packet').evaluate(el=>getComputedStyle(el).opacity==='0'));
  await page.getByRole('button',{name:'Parse',exact:true}).focus();await page.keyboard.press('Enter');
  check('Compiler opens by keyboard',await page.locator('#v3-stage-0').isVisible());
  await page.getByRole('button',{name:'Generate',exact:true}).click();
  check('Compiler selection hides the prior explanation',await page.locator('#v3-stage-2').isVisible()&&!(await page.locator('#v3-stage-0').isVisible()));
  await page.keyboard.press('Space');
  check('Compiler panel collapses with Space',!(await page.locator('#v3-stage-2').isVisible()));
  await page.getByRole('button',{name:'Resolve',exact:true}).click();
  await page.getByRole('navigation',{name:'Portfolio navigation',exact:true}).getByRole('link',{name:'Contact',exact:true}).click();
  await page.waitForFunction(()=>scrollY+innerHeight>=document.documentElement.scrollHeight-2);
  check('Contact receives the active section indicator',await page.locator('header a[href="#v3-contact"]').getAttribute('aria-current')==='location');
  await page.screenshot({path:'output/playwright/editorial-v3/desktop-footer.png'});
  for(const width of [1440,768,390,320]){
    await page.setViewportSize({width,height:width<600?844:1000});await settle();
    await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await settle();
    const result=await page.evaluate(()=>{
      const f=document.querySelector('footer'),r=f.getBoundingClientRect(),last=document.querySelector('.v3-comparison').getBoundingClientRect();
      return {width:innerWidth,viewport:innerHeight,documentHeight:document.documentElement.scrollHeight,footerTop:r.top,footerBottom:r.bottom,footerHeight:r.height,comparisonBottom:last.bottom,allFooterLinksVisible:[...f.querySelectorAll('a')].every(el=>{const a=el.getBoundingClientRect();return a.top>=document.querySelector('header').getBoundingClientRect().bottom&&a.bottom<=innerHeight+1;}),atDocumentEnd:Math.abs(r.bottom+scrollY-document.documentElement.scrollHeight)<2};
    });footers.push(result);
    check('Complete footer is reachable at '+width+'px',result.allFooterLinksVisible&&result.atDocumentEnd);
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Scroll more projects'}).click();
  await page.waitForFunction(()=>document.querySelector('.v3-strip-track').scrollLeft>0);
  check('More-project strip responds to the Browse control',await page.locator('.v3-strip-track').evaluate(el=>el.scrollLeft>0));
  await page.locator('.v3-strip-track a').last().focus();
  check('Offscreen project links remain keyboard reachable',await page.locator('.v3-strip-track a').last().evaluate(el=>el===document.activeElement));
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:1000});await page.reload();await settle();
  await page.getByRole('radio',{name:'Data',exact:true}).check();
  check('Reduced motion keeps layer selection functional',await page.getByRole('heading',{name:'ETL and data integration',exact:true}).isVisible());
  check('Reduced motion removes illustration transforms',await page.locator('.v3-app-data').evaluate(el=>getComputedStyle(el).transform==='none'));
  check('Reduced motion disables transitions',await page.locator('.v3-app-data').evaluate(el=>getComputedStyle(el).transitionDuration==='0s'));
  await page.getByRole('button',{name:'Trace a message',exact:true}).click();
  check('Reduced motion supplies a static trace explanation',await page.getByRole('button',{name:'Trace again',exact:true}).isVisible()&&await page.locator('.v3-network-packet').evaluate(el=>getComputedStyle(el).opacity==='0'));
  await page.getByRole('navigation',{name:'Portfolio navigation',exact:true}).getByRole('link',{name:'Contact',exact:true}).click();await settle();
  check('Reduced motion uses instant anchor navigation',await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior==='auto'));
  const paths=await page.locator('a[href^="/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.getAttribute('href').split('#')[0]))]);const links=[];
  for(const path of paths){const r=await page.request.get('http://127.0.0.1:3000'+path);links.push({path,status:r.status()});}
  check('Local navigation destinations return HTTP 200',links.every(link=>link.status===200));
  const staticContext=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),staticPage=await staticContext.newPage();
  await staticPage.goto('http://127.0.0.1:3000/design-lab/editorial-v3');
  check('Core content renders without JavaScript',await staticPage.locator('h1').isVisible()&&await staticPage.locator('.v3-current-copy').isVisible()&&await staticPage.locator('footer').isVisible());await staticContext.close();
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:3000/design-lab/editorial-v3');await settle();
  for(const [name,width,height] of [['desktop',1440,1000],['tablet',768,1024],['mobile',390,844]]){
    await page.setViewportSize({width,height});await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await settle();await capture(name);
  }
  await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await settle();
  await page.screenshot({path:'output/playwright/editorial-v3/mobile-footer.png'});
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await settle();
  return {checks,footers,links,errors,warnings,failedResponses};
}
