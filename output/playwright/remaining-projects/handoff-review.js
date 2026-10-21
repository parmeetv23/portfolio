async (page) => {
  const routes=['/','/projects','/projects/occluded-pet-detection','/projects/genetic-algorithm-hyperparameter-finder','/projects/ai-scheduling-hard-constraints','/projects/raspberry-pi-bare-metal','/projects/fullstack-restaurant-system','/projects/j-minus-minus-mips-compiler','/projects/climate-control-simulation','/projects/kiddoflix'];
  const results=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:900});
    for (const route of routes) {
      const response=await page.goto('http://127.0.0.1:3002'+route);
      await page.waitForLoadState('networkidle');
      const layout=await page.evaluate(()=>({heading:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth}));
      results.push({route,width,status:response.status(),...layout});
    }
  }
  await page.setViewportSize({width:320,height:844});
  await page.goto('http://127.0.0.1:3002/projects/genetic-algorithm-hyperparameter-finder');
  await page.screenshot({path:'output/playwright/remaining-projects/heading-320.png'});
  await page.goto('http://127.0.0.1:3002/projects');
  return {pass:!errors.length && results.every(result=>result.status===200 && result.heading && !result.overflow),results,errors};
}
