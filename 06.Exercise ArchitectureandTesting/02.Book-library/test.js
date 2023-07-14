const { chromium } = require('playwright-chromium')
const { expect } = require('chai')
const { request } = require('playwright-core')

const host = 'http://127.0.0.1:5500'
const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
}
describe('Test', async function () {
    this.timeout(12000)

    let browser, page;
    before(async () => {
        browser = await chromium.launch();//{headless:true, slowMo:100} ако искаме да се визуализира

    });
    after(async () => {
        await browser.close()
    });
    beforeEach(async () => {
        page = await browser.newPage()

    });
    afterEach(async () => {
        page.close
    })
    // it('works', async()=>{
    //     await new Promise(r =>setTimeout(r,2000))
    //     expect(1).to.equal(1)
    // })


    it('loads all books', async () => {
        await page.route('**/jsonstore/collections/books/', (route,request)=>{
            route.fulfill({
                body:JSON.stringify(mockData),
                status:200,
                headers:{
                    'Access-Control-Allow-Origin': '*', // за приложения които не са дошли от същият адрес
                    'Content-Type':'application/json'
                }

            })
        })

        await page.goto(`${host}/02.Book-library/index.html`);
        await page.screenshot({ path: 'page.png' })
        await page.click('text = Load all Books')
        await page.waitForSelector('text=Harry Potter')
        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        console.log(rowData)
        expect(rowData[0]).to.contains("Harry Potter and the Philosopher's StoneJ.K.RowlingEditDelete")
        expect(rowData[1]).to.contains('C# FundamentalsSvetlin NakovEditDelete')
    })

    it('create book', async ()=>{
        await page.goto(`${host}/02.Book-library/index.html`);
        await page.fill('input[name=title]', 'Title')
        await page.fill('input[name=author]', 'Author')


    const [request]= await Promise.all([
        page.waitForRequest(request=>request.method()=='POST'),
            page.click('text=Submit')
        ])

const result = JSON.parse(request.postData())
        expect(result.title).to.equal('Title')
        expect(result.author).to.equal('Author')

        // console.log(request.postData())
    })
 

})
// describe('Edit Tests', () => {
//     let browser, page;
//     before(async () => {
//         browser = await chromium.launch();//{headless:true, slowMo:100} ако искаме да се визуализира

//     });
//     after(async () => {
//         await browser.close()
//     });
//     beforeEach(async () => {
//         page = await browser.newPage()

//     });
//     afterEach(async () => {
//         page.close
//     })
//     it('Load books', async () => {

//         await page.goto(`${host}/02.Book-library/index.html`);
//         await page.click('text=Load all books');
//         await page.click('text=Edit');

//         const editFormDisplay = await page.$eval('#editForm', el => el.style.display);
//         const createFormDisplay = await page.$eval('#createForm', el => el.style.display);

//         expect(editFormDisplay).to.be.equal('block');
//         expect(createFormDisplay).to.be.equal('none');
//     });
//     it('Load correct information', async () => {

//         await page.goto(`${host}/02.Book-library/index.html`);
//         await page.click('text=Load all books');
//         await page.click('text=Edit');

//         const [response] = await Promise.all([
//             page.waitForResponse(r => r.request()),
//             page.click('text=Save'),
//         ]);
//         const data = JSON.parse(await response.body());

//         expect(data.title).to.be.equal('Harry Potter and the Philosopher\'s Stone');
//         expect(data.author).to.be.equal('J.K.Rowling');

//     });

//     it('Correct request', async () => {

//         await page.goto(`${host}/02.Book-library/index.html`);
//         await page.click('text=Load all books');
//         await page.click('text=Edit');

//         const [request] = await Promise.all([
//             page.waitForRequest(request => request.method() === 'PUT'),
//             await page.click('text=Save'),
//         ]);
//         const data = JSON.parse(await request.postData());

//         expect(data.title).to.be.equal('Harry Potter and the Philosopher\'s Stone');
//         expect(data.author).to.be.equal('J.K.Rowling');
//     });
// });
// it('Delete book', async () => {

//     await page.goto(`${host}/02.Book-library/index.html`);
//     await page.click('text=Load all books');
//     await page.click('text=Delete');

    
// });