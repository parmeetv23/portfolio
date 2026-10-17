async (page) => {
  const routes = [['home','/'],['projects','/projects'],['experience','/experience'],['resume','/resume'],['chat','/projects/distributed-chat-system'],['detection','/projects/occluded-pet-detection'],['compiler','/projects/j-minus-minus-mips-compiler']];
  const results = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if(message.type() === 'error') errors.push(message.text()); });
  for (const [device,width,height] of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844]]) {
    await page.setViewportSize({width,height});
    for (const [name,route] of routes) {
      await page.goto('http://127.0.0.1:3001'+route);
      await page.waitForLoadState('networkidle');
      // Trigger below-fold lazy media before capture; verify decoded image data.
      if(name === 'home') { await page.locator('.personal-note').scrollIntoViewIfNeeded(); await page.locator('.personal-note img').evaluate(image => image.decode()); }
      if(name === 'resume') await page.waitForTimeout(6500);
      await page.evaluate(() => window.scrollTo({top:0,behavior:"instant"}));
      await page.screenshot({path:`output/playwright/final-redesign/${name}-${device}.png`,fullPage:true});
      const metrics = await page.evaluate(() => {
        const footer=document.querySelector('footer');
        return { width:innerWidth, scrollWidth:document.documentElement.scrollWidth, height:document.documentElement.scrollHeight, h1:document.querySelectorAll('h1').length, main:document.querySelectorAll('main').length, brokenImages:[...document.images].filter(image=>!image.complete || !image.naturalWidth).map(image=>image.src), footerBottom:footer.getBoundingClientRect().bottom + scrollY };
      });
      await page.evaluate(() => window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"}));
      const footerVisible = await page.locator('.v3-footer-bottom').evaluate(el => {const r=el.getBoundingClientRect(); return r.top>=0 && r.bottom<=innerHeight;});
      results.push({device,route,...metrics,footerVisible});
    }
  }
  return {results,errors};
}
