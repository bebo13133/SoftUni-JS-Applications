import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js"
import { updateOffer } from "../data/offers.js"
import { getById } from "../data/offers.js"

const editTemplate = (product, onEdit) => html`
       <section id="edit">
          <div class="form">
            <h2>Edit Product</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
                .value=${product.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
                .value=${product.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
                .value=${product.category}
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${product.description}
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
                .value=${product.price}
              />
              <button type="submit">post</button>
            </form>
          </div>
        </section>`
export async function editPage(ctx) {

  const id = ctx.params.id
  const product = await getById(id)
  // console.log(albumList)
  ctx.render(editTemplate(product, createSubmitHandler(onEdit)))


  async function onEdit({ name,
    imageUrl,
    category,
    description,
    price
  }) {
    if ([name,
      imageUrl,
      category,
      description,
      price
    ].some(x => x == "")) {
      return alert("Please fill all fields!")
    }
    await updateOffer(id, {
      name,
      imageUrl,
      category,
      description,
      price
    })
    ctx.page.redirect(`/catalog/${id}`)
  }
}