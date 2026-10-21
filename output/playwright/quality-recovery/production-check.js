async (page) => {
  const base='http://127.0.0.1:3001',dir='output/playwright/quality-recovery';
  const slugs=['distributed-chat-system','j-minus-minus-mips-compiler','fullstack-restaurant-system','occluded-pet-detection','genetic-algorithm-hyperparameter-finder','raspberry-pi-bare-metal','climate-control-simulation','kiddoflix','ai-scheduling-hard-constraints'];
  const routes=['/','/projects',...slugs.map(s=>'/projects/'+s),'/experience','/experience/snap-remedy','/resume'];
  const errors=[],results=[],missing=[],transitions=[],prototypes=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('404 (Not Found)'))errors.push(m.text());});
  await page.setViewportSize({width:1280,height:900});
  for(const route of routes){const response=await page.goto(base+route);await page.waitForLoadState('networkidle');results.push({route,status:response.status(),h1s:await page.locator('main h1').count(),navs:await page.getByRole('navigation',{name:'Primary navigation',exact:true}).count(),footers:await page.locator('footer').count()});}
  for(const route of ['/not-a-page','/projects/not-a-project','/404']){const response=await page.goto(base+route);await page.waitForLoadState('networkidle');missing.push({route,status:response.status(),heading:await page.locator('h1').innerText(),shells:await page.locator('.site-navigation').count()});if(route==='/not-a-page')await page.screenshot({path:`${dir}/final-404-1280.png`,fullPage:true});}
  for(const path of ['editorial','editorial-v2','editorial-v3','editorial-personal','editorial-personal-2','experimental']){const r=await page.goto(base+'/design-lab/'+path);prototypes.push({path,status:r.status(),heading:await page.locator('h1').innerText()});}
  await page.goto(base+'/projects');await page.waitForLoadState('networkidle');
  for(const slug of slugs){await page.evaluate(()=>window.__portfolioProductionMarker=true);await page.locator(`a[href="/projects/${slug}"]`).first().click();await page.waitForURL(base+'/projects/'+slug);await page.waitForLoadState('networkidle');transitions.push({slug,client:await page.evaluate(()=>window.__portfolioProductionMarker===true)});await page.getByRole('link',{name:'All projects',exact:true}).first().click();await page.waitForURL(base+'/projects');}
  const download=await page.request.get(base+'/Parmeet_Virdi_Resume.pdf');
  return {results,missing,prototypes,transitions,errors,pdfStatus:download.status()};
}
