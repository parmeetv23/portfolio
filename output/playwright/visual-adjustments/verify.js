async (page) => {
  const base='http://127.0.0.1:3000', dir='output/playwright/visual-adjustments';
  const slugs=['distributed-chat-system','j-minus-minus-mips-compiler','fullstack-restaurant-system','occluded-pet-detection','genetic-algorithm-hyperparameter-finder','raspberry-pi-bare-metal','climate-control-simulation','family-streaming-interface','ai-scheduling-hard-constraints'];
  const routes=['/','/projects',...slugs.map(s=>'/projects/'+s),'/experience','/experience/snap-remedy','/resume'];
  const sizes=[{width:320,height:780},{width:390,height:844},{width:768,height:1024},{width:1280,height:900},{width:1600,height:1000}];
  const results=[], interactions=[], errors=[], failedRequests=[], internalLinks=new Set(), tableChecks=[];
  let routeNow='';
  page.on('pageerror',e=>errors.push({route:routeNow,message:e.message}));
  page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('404 (Not Found)')) errors.push({route:routeNow,message:m.text()});});
  page.on('requestfailed',r=>{if(!r.failure()?.errorText.includes('ERR_ABORTED')) failedRequests.push({route:routeNow,url:r.url(),error:r.failure()?.errorText});});
  const settle=async()=>{
    await page.waitForLoadState('networkidle');
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>{document.activeElement?.blur();scrollTo({top:0,behavior:'instant'});});
    await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode().catch(()=>{});}));});
  };
  const press=async(button)=>{await button.focus();await page.keyboard.press('Enter');};
  for(const size of sizes){
    await page.setViewportSize(size);
    for(const route of routes){
      routeNow=route;
      const response=await page.goto(base+route);await settle();
      const name=route==='/'?'home':route.split('/').pop();
      const state=await page.evaluate(()=>{
        const visible=e=>e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0;
        const checked=[...document.querySelectorAll('main p,main h1,main h2,main figure,main .experiment-table,main .runtime-boundary')].filter(e=>visible(e)&&!e.closest('.v3-sr-only'));
        const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
        const anchors=[...document.querySelectorAll('a[href^="#"]')];
        return {title:document.title,h1s:document.querySelectorAll('main h1').length,heading:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,clipped:checked.filter(e=>e.scrollWidth>Math.ceil(e.getBoundingClientRect().width)+1).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,100)})),duplicateIds:ids.filter((id,i)=>ids.indexOf(id)!==i),brokenAnchors:anchors.filter(a=>a.hash.length>1&&!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash),images:[...document.images].map(e=>({src:e.currentSrc,loaded:e.complete&&e.naturalWidth>0,alt:e.hasAttribute('alt')})),links:[...document.querySelectorAll('a[href^="/"]')].map(e=>e.getAttribute('href')),description:!!document.querySelector('meta[name="description"]')?.content,footer:!!document.querySelector('footer nav'),primary:!!document.querySelector('nav[aria-label="Primary navigation"]')};
      });
      state.links.forEach(link=>internalLinks.add(link));delete state.links;
      let violations=[];
      if([390,1600].includes(size.width)){
        await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
        violations=await page.evaluate(async()=> (await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
        await page.screenshot({path:`${dir}/final-${name}-${size.width}-full.png`,fullPage:true});
      }
      await page.evaluate(()=>scrollTo({top:0,behavior:"instant"}));
      await page.screenshot({path:`${dir}/final-${name}-${size.width}-top.png`});
      const figure=page.locator('main .case-feature > figure, main .chat-architecture-section > figure, main .snap-architecture-section > figure').first();
      if(await figure.count()) await figure.screenshot({style:'.site-navigation,.site-skip{visibility:hidden}',path:`${dir}/final-${name}-${size.width}-figure.png`});
      const tables=page.locator('.experiment-table');
      for(let i=0;i<await tables.count();i++){
        const table=tables.nth(i);await table.screenshot({style:'.site-navigation,.site-skip{visibility:hidden}',path:`${dir}/final-${name}-${size.width}-table-${i}.png`});
        tableChecks.push({route,width:size.width,...await table.evaluate(e=>{
          const cells=[...e.querySelectorAll('th,td')];
          const truncated=cells.filter(c=>{const r=document.createRange();r.selectNodeContents(c);const b=r.getBoundingClientRect(),a=c.getBoundingClientRect();return b.right>a.right+1||b.left<a.left-1;}).map(c=>c.textContent);
          return {truncated,rows:e.querySelectorAll('tbody tr').length};
        })});
      }
      const temp=page.getByRole('group',{name:'Temperature relative to target',exact:true});
      if(await temp.count()){
        for(const [index,expected] of [['On','Off'],['Off','Off'],['Off','On']].entries()){
          const button=temp.getByRole('button').nth(index);await press(button);
          const actual=await temp.locator('..').locator('dd').allTextContents();
          interactions.push({route,width:size.width,kind:'temperature',index,pass:JSON.stringify(expected)===JSON.stringify(actual)&&await button.getAttribute('aria-pressed')==='true'});
          if([390,1600].includes(size.width)) await temp.locator('..').screenshot({path:`${dir}/state-temperature-${size.width}-${index}.png`});
        }
      }
      const chat=page.getByRole('group',{name:'Architecture view',exact:true});
      if(await chat.count()){
        for(const [i,flow] of ['discovery','messages','coordination','failure'].entries()){
          const button=chat.getByRole('button').nth(i);await press(button);
          interactions.push({route,width:size.width,kind:'chat-flow',flow,pass:await chat.locator('..').getAttribute('data-flow')===flow&&await button.getAttribute('aria-pressed')==='true'});
          const fanout=page.getByRole('group',{name:'Gossip fan-out',exact:true});
          if(await fanout.count()) for(const count of [1,2]){await press(fanout.getByRole('button',{name:String(count),exact:true}));interactions.push({route,width:size.width,kind:'fanout',count,pass:await chat.locator('..').getAttribute('data-fanout')===String(count)});}
          const election=page.getByRole('group',{name:'Election sequence',exact:true});
          if(await election.count()) for(const [j,stage] of ['lost','election','leader'].entries()){await press(election.getByRole('button').nth(j));const svg=page.locator(`svg[data-election-stage="${stage}"]:visible`);interactions.push({route,width:size.width,kind:'election',stage,pass:await svg.count()===1});}
          if(route.includes('distributed-chat-system')&&[390,1600].includes(size.width)) await chat.locator('..').screenshot({path:`${dir}/state-chat-${size.width}-${flow}.png`});
        }
      }
      const filter=page.getByRole('group',{name:'Filter projects by category',exact:true});
      if(await filter.count()){
        for(const button of await filter.getByRole('button').all()){
          const label=await button.innerText();await press(button);
          const labels=await page.locator('.collection-category').allTextContents(),count=await page.locator('.collection-project').count();
          interactions.push({route,width:size.width,kind:'filter',label,count,pass:label==='All'?count===9:labels.every(c=>c===label)&&count>0});
        }
        await press(filter.getByRole('button',{name:'All',exact:true}));
      }
      const menu=page.getByRole('button',{name:'Menu',exact:true});
      if(await menu.isVisible()){
        await press(menu);const expanded=await page.getByRole('button',{name:'Close',exact:true}).getAttribute('aria-expanded');
        await page.keyboard.press('Escape');
        interactions.push({route,width:size.width,kind:'mobile-menu',pass:expanded==='true'&&await page.getByRole('button',{name:'Menu',exact:true}).getAttribute('aria-expanded')==='false'&&await page.getByRole('button',{name:'Menu',exact:true}).evaluate(e=>e===document.activeElement)});
      }
      if(route==='/resume'){
        const summary=page.locator('.resume-viewer summary');await press(summary);const closed=await page.locator('.resume-viewer details').getAttribute('open')===null;await press(summary);interactions.push({route,width:size.width,kind:'resume-preview',pass:closed&&await page.locator('.resume-viewer details').getAttribute('open')!==null});
      }
      results.push({route,...size,status:response.status(),...state,violations});
    }
  }
  // Actual client transitions retain the same document; each rendered internal link is exercised.
  await page.setViewportSize({width:1280,height:900});
  const transitions=[];
  for(const target of [...internalLinks].filter(l=>!l.endsWith('.pdf')&&!l.startsWith('/images/'))){
    const origin=target.startsWith('/projects/')?'/projects':target.startsWith('/experience/')?'/experience':'/';
    routeNow=origin;await page.goto(base+origin);await settle();
    await page.evaluate(()=>window.__portfolioDocumentMarker='same-document');
    const link=page.locator(`a[href="${target}"]`).first();
    if(!await link.count()){transitions.push({target,pass:false,reason:'No source link found'});continue;}
    await link.click();await page.waitForURL(base+target);await settle();
    transitions.push({target,pass:await page.evaluate(()=>window.__portfolioDocumentMarker==='same-document')});
  }
  // Keyboard entry, scroll controls, large text, reduced motion, and landscape.
  await page.goto(base+'/');await settle();await page.keyboard.press('Tab');
  const skipFocused=await page.getByRole('link',{name:'Skip to content'}).evaluate(e=>e===document.activeElement);
  await page.keyboard.press('Enter');const skipTarget=await page.locator('main').evaluate(e=>e===document.activeElement);
  interactions.push({kind:'skip-link',pass:skipFocused&&skipTarget});
  const browse=page.getByRole('button',{name:'Scroll more projects'});await browse.scrollIntoViewIfNeeded();const before=await page.locator('.v3-strip-track').evaluate(e=>e.scrollLeft);await press(browse);await page.waitForFunction(before=>document.querySelector('.v3-strip-track').scrollLeft>before,before);interactions.push({kind:'project-strip',pass:true});
  await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:844,height:390});await page.goto(base+'/projects/climate-control-simulation');await settle();
  const landscape=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,animation:[...document.querySelectorAll('main *')].some(e=>getComputedStyle(e).animationDuration.split(',').some(s=>parseFloat(s)>0))}));
  await page.screenshot({path:`${dir}/final-landscape-844.png`,fullPage:true});
  await page.setViewportSize({width:390,height:844});await page.goto(base+'/projects/genetic-algorithm-hyperparameter-finder');await settle();await page.addStyleTag({content:'html{font-size:200%}'});const enlarged=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);await page.screenshot({path:`${dir}/final-large-text-390.png`,fullPage:true});
  const assetChecks=[];for(const path of ['/Parmeet_Virdi_Resume.pdf','/images/projects/pet-detection/clean-training-loss.png']){const r=await page.request.get(base+path);assetChecks.push({path,status:r.status(),type:r.headers()['content-type']});}
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/projects');await settle();
  const actualOrder=await page.locator('.collection-copy h2 a').evaluateAll(links=>links.map(a=>a.getAttribute('href').split('/').pop()));
  const expectedOrder=['distributed-chat-system','occluded-pet-detection','j-minus-minus-mips-compiler','genetic-algorithm-hyperparameter-finder','ai-scheduling-hard-constraints','fullstack-restaurant-system','raspberry-pi-bare-metal','climate-control-simulation','family-streaming-interface'];
  const restaurant=page.locator('.collection-text-led');
  const restaurantListingFigureCount=await restaurant.locator('figure,svg,img').count();
  await page.goto(base+'/projects/fullstack-restaurant-system');await settle();
  const restaurantCaseFigureCount=await page.locator('main figure,main svg,main img').count();
  await page.goto(base+'/projects/genetic-algorithm-hyperparameter-finder');await settle();
  const generationRows=await page.locator('.generation-rows > li').count();
  const eliteRadii=await page.locator('.generation-rows svg g:first-of-type > circle:first-child').evaluateAll(circles=>circles.map(e=>e.getAttribute('r')));
  await page.goto(base+'/projects/j-minus-minus-mips-compiler');await settle();
  const compilerStages=await page.locator('.compiler-step-label').allTextContents();
  const expectedOutput=await page.locator('.compiler-output samp').innerText();
  const oldUrl=await page.request.get(base+'/projects/kiddoflix',{maxRedirects:0});
  await page.goto(base+'/projects/kiddoflix');await settle();
  const renamedPage={url:page.url(),heading:await page.locator('h1').innerText(),oldNamePresent:await page.locator('main').evaluate(e=>e.innerText.includes('KiddoFlix'))};
  const ownerChecks={actualOrder,orderPass:JSON.stringify(actualOrder)===JSON.stringify(expectedOrder),restaurantListingFigureCount,restaurantCaseFigureCount,generationRows,eliteRadii,compilerStages,expectedOutput,redirectStatus:oldUrl.status(),redirectLocation:oldUrl.headers()['location'],renamedPage};
  return {results,interactions,transitions,tableChecks,errors,failedRequests,landscape,enlargedTextOverflow:enlarged,assetChecks,ownerChecks};
}
