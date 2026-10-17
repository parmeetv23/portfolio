async (page) => {
  const base='http://127.0.0.1:3001';
  const checks=[], errors=[], failedResponses=[], accessibility=[];
  const check=(name,pass,detail)=>{checks.push({name,pass,detail});};
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.status()>=400)failedResponses.push({url:r.url(),status:r.status()});});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/projects'); await page.waitForLoadState('networkidle');
  const slugs=await page.locator('.collection-copy h2 a').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')));
  check('All nine projects present',slugs.length===9);
  for(const [category,count] of [['Distributed',1],['ML',3],['Embedded',1],['Full-Stack',1],['Systems',2],['Frontend',1],['All',9]]) {
    await page.getByRole('button',{name:category,exact:true}).click();
    check('Filter '+category,await page.locator('.collection-project').count()===count && await page.getByRole('button',{name:category,exact:true}).getAttribute('aria-pressed')==='true');
  }
  await page.getByRole('button',{name:'ML',exact:true}).focus(); await page.keyboard.press('Enter');
  check('Keyboard filtering',await page.locator('.collection-project').count()===3);
  await page.screenshot({path:'output/playwright/final-redesign/projects-filter.png'});
  await page.goto(base+'/'); await page.waitForLoadState('networkidle');
  await page.keyboard.press('Tab');
  check('Skip link receives first keyboard focus',await page.locator('.site-skip').evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Enter');
  check('Skip link targets main content',await page.locator('main').evaluate(el=>el===document.activeElement));
  await page.getByRole('radio',{name:'Services',exact:true}).check();
  check('Application layer selector',await page.locator('.v3-layer-title').textContent()==='Django APIs and application logic');
  await page.keyboard.press('ArrowRight');
  check('Native radio arrow-key navigation',await page.getByRole('radio',{name:'Data',exact:true}).isChecked());
  await page.locator('.v3-application-figure').screenshot({path:'output/playwright/final-redesign/application-data.png'});
  await page.getByRole('button',{name:'Generate',exact:false}).click();
  check('Compiler disclosure',await page.locator('#v3-stage-2').isVisible());
  await page.getByRole('button',{name:'Trace a message',exact:false}).click();
  check('Message trace responds',await page.locator('.v3-network').getAttribute('class').then(x=>x.includes('is-tracing')));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.getByRole('button',{name:'Trace again',exact:false}).click();
  const reduced=await page.locator('.v3-network-packet').evaluate(el=>({animation:getComputedStyle(el).animationName,opacity:getComputedStyle(el).opacity,scroll:getComputedStyle(document.documentElement).scrollBehavior}));
  check('Reduced motion removes travel and smooth scrolling',reduced.animation==='none'&&reduced.opacity==='0'&&reduced.scroll==='auto',reduced);
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const [name,href] of [['Experience','/experience'],['Projects','/projects'],['Resume','/resume'],['Home','/']]) {
    await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name,exact:true}).click();
    await page.waitForURL(base+href);
    check('Primary navigation '+name,await page.locator('nav[aria-label="Primary navigation"] a[aria-current="page"]').textContent()===name);
  }
  await page.getByRole('link',{name:'More about my work',exact:false}).click(); await page.waitForURL('**/experience#snap-remedy');
  check('Experience anchor navigation',await page.locator('#snap-remedy').isVisible());
  await page.goto(base+'/resume');
  const downloadPromise=page.waitForEvent('download');
  await page.getByRole('link',{name:'Download PDF',exact:false}).click();
  const download=await downloadPromise;
  check('Resume download filename',download.suggestedFilename()==='Parmeet_Virdi_Resume.pdf');
  const pdf=await page.request.get(base+'/Parmeet_Virdi_Resume.pdf');
  check('Resume served as PDF',pdf.ok()&&pdf.headers()['content-type'].includes('application/pdf')&&(await pdf.body()).slice(0,5).toString()==='%PDF-');
  const popupPromise=page.waitForEvent('popup'); await page.getByRole('link',{name:'Open PDF',exact:false}).click(); const popup=await popupPromise; await popup.waitForLoadState();
  check('Open PDF opens document',popup.url().includes('Parmeet_Virdi_Resume.pdf')); await popup.close();
  await page.locator('summary').click(); check('PDF preview can be collapsed',!(await page.locator('iframe').isVisible()));
  await page.locator('summary').click(); check('PDF preview can be reopened',await page.locator('iframe').isVisible());
  await page.setViewportSize({width:390,height:844}); await page.goto(base+'/');
  await page.getByRole('button',{name:'Menu',exact:false}).click();
  check('Mobile menu opens',await page.locator('#site-menu').isVisible());
  await page.screenshot({path:'output/playwright/final-redesign/mobile-menu.png'});
  await page.keyboard.press('Escape'); check('Escape closes menu and restores focus',!(await page.locator('#site-menu').isVisible()) && await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement));
  await page.getByRole('button',{name:'Menu',exact:false}).click(); await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'Projects',exact:true}).click(); await page.waitForURL('**/projects');
  check('Mobile navigation closes after route change',!(await page.locator('#site-menu').isVisible()));
  const responsive=[];
  for(const width of [320,390,820,1440]) {
    await page.setViewportSize({width,height:1000});
    for(const route of ['/', '/projects', '/experience', '/resume', ...slugs]) {
      await page.goto(base+route); await page.waitForLoadState('networkidle');
      if(route==='/') {await page.locator('.personal-note').scrollIntoViewIfNeeded();await page.locator('.personal-note img').evaluate(img=>img.decode());}
      await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
      const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth, footerVisible:[...document.querySelectorAll('.v3-footer-bottom a')].every(a=>{const r=a.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight+1;}),brokenImages:[...document.images].filter(img=>!img.complete||!img.naturalWidth).length, h1:document.querySelectorAll('h1').length, main:document.querySelectorAll('main').length}));
      responsive.push({width,route,...result});
      if(width===390 || width===1440) {
        await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
        const axe=await page.evaluate(async()=>{const result=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));});
        accessibility.push({width,route,violations:axe});
      }
    }
  }
  check('Responsive pages have one main and heading, no overflow, broken images, or clipped footer links',responsive.every(r=>!r.overflow&&r.footerVisible&&!r.brokenImages&&r.h1===1&&r.main===1));
  check('Automated accessibility checks',accessibility.every(r=>!r.violations.length));
  const staticContext=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:1440,height:1000}});
  const staticPage=await staticContext.newPage(); await staticPage.goto(base+'/projects');
  check('All project content available without JavaScript',await staticPage.locator('.collection-project').count()===9); await staticContext.close();
  return {checks,responsive,accessibility,errors,failedResponses};
}
