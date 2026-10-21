async (page) => {
  const dir='output/playwright/visual-adjustments';
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:1000});
    for(const route of ['/','/projects','/projects/j-minus-minus-mips-compiler','/projects/genetic-algorithm-hyperparameter-finder','/projects/fullstack-restaurant-system','/projects/ai-scheduling-hard-constraints','/projects/family-streaming-interface']){
      await page.goto('http://127.0.0.1:3000'+route);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);
      await page.locator('img').evaluateAll(async imgs=>Promise.all(imgs.map(async e=>{e.loading='eager';await e.decode().catch(()=>{});})));await page.evaluate(()=>{document.activeElement?.blur();scrollTo({top:0,behavior:'instant'});});
      const name=route==='/'?'home':route.split('/').pop();await page.screenshot({path:`${dir}/preview-${name}-${width}.png`,fullPage:true});
      const figure=page.locator('.case-feature');if(await figure.count())await figure.screenshot({path:`${dir}/preview-feature-${name}-${width}.png`,style:'.site-navigation,.site-skip{visibility:hidden}'});
    }
  }
  return {captured:14};
}
