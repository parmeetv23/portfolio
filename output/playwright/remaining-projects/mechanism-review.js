async (page) => {
  const results=[];
  for (const width of [1440,390,320,844]) {
    await page.setViewportSize({width,height:width===844?390:1000});
    for (const [slug,group,labels] of [
      ['j-minus-minus-mips-compiler','Semantic pass',['Declarations','Resolution','Types','Structure']],
      ['climate-control-simulation','Temperature relative to target',['Below band','Inside band','Above band']],
    ]) {
      await page.goto(`http://127.0.0.1:3002/projects/${slug}`);
      await page.waitForLoadState('networkidle');
      await page.addScriptTag({path:'node_modules/axe-core/axe.min.js'});
      const figure=page.locator('.project-technical');
      for (const label of labels) {
        const button=page.getByRole('group',{name:group,exact:true}).getByRole('button',{name:label,exact:true});
        await button.click();
        const layout=await figure.evaluate(element=>({
          clippedChildren:[...element.querySelectorAll('button,code,p,dd,dt,figcaption')].filter(node=>node.scrollWidth>Math.ceil(node.getBoundingClientRect().width)+1).map(node=>node.textContent),
          smallTargets:[...element.querySelectorAll('button')].filter(node=>node.getBoundingClientRect().height<44 || node.getBoundingClientRect().width<44).map(node=>node.textContent),
          selected:[...element.querySelectorAll('button[aria-pressed="true"]')].length,
        }));
        const violations=await page.evaluate(async()=> (await window.axe.run(document.querySelector('.project-technical'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>v.id));
        if ([1440,390].includes(width)) await figure.screenshot({path:`output/playwright/remaining-projects/${slug}-${label.toLowerCase().replaceAll(' ','-')}-${width}.png`});
        results.push({width,slug,label,...layout,violations});
      }
    }
  }
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto('http://127.0.0.1:3002/projects/occluded-pet-detection');
    await page.locator('.research-artifact img').evaluate(image=>image.decode());
    await page.locator('.research-artifact').screenshot({path:`output/playwright/remaining-projects/original-training-figure-${width}.png`});
    await page.locator('.experiment-table').screenshot({path:`output/playwright/remaining-projects/pet-metrics-${width}.png`});
    await page.goto('http://127.0.0.1:3002/projects/genetic-algorithm-hyperparameter-finder');
    await page.locator('.experiment-table').screenshot({path:`output/playwright/remaining-projects/search-metrics-${width}.png`});
  }
  return {pass:results.every(result=>!result.clippedChildren.length && !result.smallTargets.length && !result.violations.length && result.selected===1),results};
}
