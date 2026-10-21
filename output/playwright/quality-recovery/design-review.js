async (page) => {
  const base = 'http://127.0.0.1:3000';
  const names = ['j-minus-minus-mips-compiler','fullstack-restaurant-system','occluded-pet-detection','genetic-algorithm-hyperparameter-finder','raspberry-pi-bare-metal','climate-control-simulation','kiddoflix','ai-scheduling-hard-constraints'];
  const dir = 'output/playwright/quality-recovery';
  const results = [];
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    for (const name of ['home','projects',...names]) {
      const route = name === 'home' ? '/' : name === 'projects' ? '/projects' : '/projects/'+name;
      const response = await page.goto(base+route);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({path:`${dir}/design-${name}-${width}.png`,fullPage:true});
      const feature = page.locator('.case-feature');
      if (await feature.count()) await feature.screenshot({path:`${dir}/figure-${name}-${width}.png`});
      results.push({route,width,status:response.status(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
    }
  }
  return {results,errors};
}
