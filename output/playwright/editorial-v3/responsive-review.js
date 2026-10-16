async (page) => {
  const report=[];
  for (const width of [320,390,600,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:width<600?844:1000});
    await page.evaluate(async()=>{await document.fonts.ready;window.scrollTo({top:0,behavior:'instant'});});
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    report.push(await page.evaluate(()=>{
      const title=document.querySelector('h1'),range=document.createRange();range.selectNodeContents(title);
      const lines=[...range.getClientRects()].filter(r=>r.width>0);
      const experience=document.querySelector('#v3-experience'),projects=document.querySelector('#v3-work');
      const stack=document.querySelector('.v3-current-stack').getBoundingClientRect(),link=document.querySelector('.v3-current-link').getBoundingClientRect();
      const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
      return {width:innerWidth,clientWidth:document.documentElement.clientWidth,pageWidth:document.documentElement.scrollWidth,horizontalOverflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,h1Lines:lines.length,h1TextRight:Math.max(...lines.map(r=>r.right)),mainCount:document.querySelectorAll('main').length,h1Count:document.querySelectorAll('h1').length,professionalExperienceBeforeProjects:!!(experience.compareDocumentPosition(projects)&Node.DOCUMENT_POSITION_FOLLOWING),stackAndLinkOverlap:intersects(stack,link),headerHeight:document.querySelector('header').getBoundingClientRect().height,navLinksFit:[...document.querySelectorAll('header nav a')].every(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=document.documentElement.clientWidth}),robots:document.querySelector('meta[name="robots"]')?.content};
    }));
  }
  return report;
}
