import { html, render } from '../node_modules/lit-html/lit-html.js'
import { get } from '../api.js'
import page from '../node_modules/page/page.mjs'


const myFurnitureTemplate = (data) => html`
    <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
    </div>
        <div class="row space-top">
            ${data.map(furniture=> html`
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src="${furniture.img.includes('http')? furniture.img: `/${furniture.img}`}"  />
                            <p>${furniture.description}</p>
                            <footer>
                                <p>Price: <span>${furniture.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>`
                )}
        </div>`
export async function myFurnitureView() {
    const id = JSON.parse(sessionStorage.getItem('userData')).id
    const data = await get(`/data/catalog`)
    render(myFurnitureTemplate(data.filter(e=>e._ownerId === JSON.parse(sessionStorage.getItem('userData')).id)), document.querySelector('.container'))
}