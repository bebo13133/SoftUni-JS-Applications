const {chromium} = require('playwright-chromium')
const {expect} = require ('chai')



describe('Test', async function(){
    this.timeout(10000)

    let browser, page;
    before(async ()=>{
        browser = await chromium.launch();
    });
    after(async ()=>{
        await browser.close()
    });
    beforeEach (async ()=>{
        page = browser.newPage()

    });
    afterEach(async()=>{
        page.close()
    })
    it('works', async()=>{
        await new Promise(r =>setTimeout(2000,r))
        expect(1).to.equal(1)
    })
})