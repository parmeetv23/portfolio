async (page) => {
  const base='http://127.0.0.1:3000',dir='output/playwright/quality-recovery';
  const slugs=['distributed-chat-system','j-minus-minus-mips-compiler','fullstack-restaurant-system','occluded-pet-detection','genetic-algorithm-hyperparameter-finder','raspberry-pi-bare-metal','climate-control-simulation','kiddoflix','ai-scheduling-hard-constraints'];
  const routes=['/','/projects',...slugs.map(s=>'/projects/'+s),'/experience','/experience/snap-remedy','/resume'];
  const errors=[],rechecks=[];page.on('pageerror',e=>errors.push(e.message));
  for(const width of [320,390,768,1280,1600]){
    await page.setViewportSize({width,height:width===320?780:width===390?844:width===768?1024:width===1280?900:1000});
    for(const route of routes){
      const response=await page.goto(base+route);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);
      await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode().catch(()=>{});}));});
      await page.evaluate(()=>{document.activeElement?.blur();scrollTo({top:0,behavior:'instant'});});
      const name=route==='/'?'home':route.split('/').pop();
      await page.screenshot({path:`${dir}/final-${name}-${width}-top.png`});
      if([390,1600].includes(width))await page.screenshot({path:`${dir}/final-${name}-${width}-full.png`,fullPage:true});
      const figure=page.locator('main .case-feature > figure, main .chat-architecture-section > figure, main .snap-architecture-section > figure').first();
      const isolatedStyle='.site-navigation,.site-skip{visibility:hidden}';
      if(await figure.count())await figure.screenshot({path:`${dir}/final-${name}-${width}-figure.png`,style:isolatedStyle});
      for(const [i,table] of (await page.locator('.experiment-table').all()).entries())await table.screenshot({path:`${dir}/final-${name}-${width}-table-${i}.png`,style:isolatedStyle});
      const temp=page.getByRole('group',{name:'Temperature relative to target',exact:true});
      if(await temp.count())for(const [index,expected]of [['On','Off'],['Off','Off'],['Off','On']].entries()){
        const button=temp.getByRole('button').nth(index);await button.focus();await page.keyboard.press('Enter');
        const values=await temp.locator('..').locator('dd').allTextContents();
        const focus=await button.evaluate(e=>{const r=e.getBoundingClientRect(),h=document.querySelector('.site-navigation').getBoundingClientRect();return {focused:document.activeElement===e,visible:r.top>=h.bottom&&r.bottom<=innerHeight,outline:getComputedStyle(e).outlineStyle};});
        rechecks.push({route,width,index,pass:JSON.stringify(values)===JSON.stringify(expected),focus});
        if([390,1600].includes(width))await temp.locator('..').screenshot({path:`${dir}/state-temperature-${width}-${index}.png`,style:isolatedStyle});
      }
      if(route==='/projects/j-minus-minus-mips-compiler')rechecks.push({route,width,status:response.status(),noWrap:await page.locator('.case-summary .language-name').evaluate(e=>getComputedStyle(e).whiteSpace==='nowrap'),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
    }
  }
  return {errors,rechecks};
}
