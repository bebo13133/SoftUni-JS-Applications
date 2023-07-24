import { html, render } from '../node_modules/lit-html/lit-html.js'
import { get,put } from '../api.js'
import page from '../node_modules/page/page.mjs'

const editTemplate = (data) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit="${onSubmit}" id="${data._id}" >
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" .value="${data.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model" .value="${data.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year" .value="${data.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" .value="${data.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" value="${data.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" value="${data.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${data.material}">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`


export async function editView(ctx){
    console.log(ctx)
    const id = ctx.params.id
    console.log(id)
const data = await get(`/data/catalog/${id}`)
render(editTemplate(data), document.querySelector('.container'))
    console.log(data);
}
async function onSubmit(e){
    e.preventDefault()
    const [make, model, year, description, price, image, material] = ['#new-make', '#new-model', '#new-year', '#new-description', '#new-price', '#new-image', '#new-material']
    .map(selector => document.querySelector(selector))
let isValid = true
make.value.length >= 4 ? validateElements(make, true) : validateElements(make, false)
model.value.length >= 4 ? validateElements(model, true) : validateElements(model, false)
description.value.length > 10 ? validateElements(description, true) : validateElements(description, false)
Number(price.value) >0 ? validateElements(price, true) : validateElements(price, false)
Number(year.value) >=1950 &&  Number(year.value) <=2050 ? validateElements(year, true) : validateElements(year, false)
image !=="" ? validateElements(image, true) : validateElements(image, false)
const id = e.target.id


function validateElements(element, boolean) {
    if (boolean == false) {
        isValid = false
        element.classList.remove('is-valid')
        element.classList.add('is-invalid')
    } else {
        element.classList.remove('is-invalid')
        element.classList.add('is-valid')
    }
}

if(isValid){
    const data = {
        make: make.value,
        model: model.value,
        year: year.value,
        description: description.value,
        price: price.value,
        img: image.value,
        material: material.value
    }
    const res = await put(`/data/catalog/${id}`, data)
    page.redirect('/')
}



}