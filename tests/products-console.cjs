// Browser regression checks. Run against the static server with Playwright installed.
// Example: SITE_URL=http://127.0.0.1:8009 node tests/products-console.cjs
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.SITE_URL || 'http://127.0.0.1:8009';
(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:960}});
    const errors = [], externalRequests = [];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('request',request=>{if(new URL(request.url()).origin!==new URL(base).origin && !request.url().startsWith('data:'))externalRequests.push(request.url());});
    await page.goto(`${base}/products.html`);
    const tab = name => page.locator(`button[data-panel="${name}"]`);
    const command = name => page.locator(`button[data-command="${name}"]`);
    const expectText = async (selector, text) => assert((await page.locator(selector).textContent()).includes(text));
    const beginReview = async () => {
      await tab('task').click(); await command('request').click();
      await expectText('[data-task-status]','requested');
      assert(await command('approve').isHidden());
      await command('continue').click();
      await expectText('[data-task-status]','Awaiting');
      assert(await command('approve').isHidden());
      await command('review').click();
    };
    assert.equal(await page.locator('.console-preview-label').textContent(),'Interactive Concept Preview');
    await expectText('.console-disclaimer','not connected to your computer');
    assert.equal(await page.locator('.concept-laptop,.interface-preview').count(),0);
    for (const assistant of ['Claude','Gemini','Copilot','ChatGPT']) {
      await page.locator(`.ai-node[data-assistant="${assistant}"]`).click();
      await expectText('#console-overview [data-selected-assistant]',assistant);
      assert.equal(await page.locator(`.console-assistants [data-assistant="${assistant}"]`).getAttribute('aria-pressed'),'true');
      assert.equal(await page.locator('.ai-node[aria-pressed="true"]').count(),1);
    }
    await tab('connections').click();
    await page.locator('.console-assistants [data-assistant="Claude"]').click();
    assert.equal(await page.locator('.ai-node[data-assistant="Claude"]').getAttribute('aria-pressed'),'true');
    await tab('overview').focus(); await page.keyboard.press('End');
    assert.equal(await tab('activity').getAttribute('aria-selected'),'true');
    await page.keyboard.press('Home');
    assert.equal(await tab('overview').getAttribute('aria-selected'),'true');
    await beginReview(); await command('approve').click();
    assert(await command('review').isHidden());
    await command('finish').click();
    await expectText('[data-task-result]','12 example files');
    await expectText('[data-task-result]','no real files');
    await tab('activity').click();
    await expectText('[data-activity-log]','Task requested');
    await expectText('[data-activity-log]','Permission checked');
    await expectText('[data-activity-log]','Approval received');
    await expectText('[data-activity-log]','Task completed');
    await expectText('[data-activity-log]','result recorded');
    await tab('task').click();await command('restart').click();await beginReview();await command('deny').click();
    await expectText('[data-task-result]','Denied');
    await command('restart').click();await beginReview();
    await tab('permissions').click();await page.locator('[data-permission="folders"]').uncheck();
    await tab('task').click();assert(await command('approve').isHidden());await command('review').click();
    assert(await command('approve').isDisabled());await expectText('[data-task-scope]','blocked');
    await tab('permissions').click();await page.locator('[data-permission="folders"]').check();
    await tab('task').click();assert(await command('approve').isHidden());await command('review').click();
    assert(await command('approve').isEnabled());await command('approve').click();
    await tab('permissions').click();await page.locator('[data-permission="tasks"]').uncheck();
    await tab('task').click();assert(await command('finish').isHidden());assert(await command('request').isVisible());
    await command('reset').click();
    assert(await page.locator('[data-permission="folders"]').isChecked());
    assert(await page.locator('[data-permission="tasks"]').isChecked());
    assert(!(await page.locator('[data-permission="apps"]').isChecked()));
    await expectText('#console-task [data-selected-assistant]','ChatGPT');
    for(const width of [320,390,768,1024,1051,1280,1440,1920]){
      await page.setViewportSize({width,height:900});
      for(const panel of ['overview','connections','permissions','task','activity']){
        await tab(panel).click();
        assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`${width}px overflow in ${panel}`);
      }
    }
    await page.setViewportSize({width:320,height:740});
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    for(const panel of ['overview','connections','permissions','task','activity']){
      await tab(panel).click();assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`200% overflow ${panel}`);
    }
    await page.evaluate(()=>document.documentElement.style.removeProperty('font-size'));
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await page.locator('.console-action').first().evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
    assert.deepEqual(errors,[]);assert.deepEqual(externalRequests,[]);
    const nojs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const staticPage=await nojs.newPage();await staticPage.goto(`${base}/products.html`);
    assert.equal(await staticPage.locator('.console-panel:visible').count(),5);
    assert(await staticPage.locator('[data-command="request"]').isDisabled());
    await nojs.close();
    console.log('PASS assistant synchronization, keyboard tabs, approval/denial, blocked permissions, approval invalidation, reset, all panels at 8 widths, 200% text, reduced motion, no-JS fallback, no external calls, no console errors.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
