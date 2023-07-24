import { html, render } from '../node_modules/lit-html/lit-html.js'
import { post } from '../api.js'
import page from '../node_modules/page/page.mjs'



const createTemplate = () => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit="${onSubmit}">
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control valid" id="new-make" type="text" name="make">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control is-valid" id="new-model" type="text" name="model">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control is-invalid" id="new-year" type="number" name="year">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Create" />
                </div>
            </div>
        </form>
`









export function createView() {
    render(createTemplate(), document.querySelector('.container'))
}


async function onSubmit(e) {
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
        const res = await post('/data/catalog', data)
        page.redirect('/')
    }

}

