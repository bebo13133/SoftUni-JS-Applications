import { html, render } from '../node_modules/lit-html/lit-html.js'
import { get } from '../api.js'
import { onDelete } from './deleteView.js'

const detailTemplate = (data) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${data.img.includes('http')? data.img: `/${data.img}`}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>${data.price}</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div>                  
                ${data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/edit/${data._id}" class="btn btn-info">Edit</a>` : null}
                ${data._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href=”javascript:void(0)” class="btn btn-red" id="${data._id}" >Delete</a>` : null}
                </div>
            </div>
        </div>
`

export async function detailsViews(ctx) {
    const id = ctx.params.id
    // const data = await getDetails(id)
    render(detailTemplate(await getDetails(id)), document.querySelector('.container'));

    document.querySelector('.btn-red').addEventListener('click', onDelete)
}
async function getDetails(id) {
    return await get(`/data/catalog/${id}`)
}