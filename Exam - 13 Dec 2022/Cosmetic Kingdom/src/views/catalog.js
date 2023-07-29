import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (products) => html`
         <h2>Products</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${products.length >0 ? html`${products.map(albumTemplate)}`:html`<h2>No products yet.</h2>`}
         
        </section>`

const albumTemplate = (product) => html`
   <div class="product">
            <img src="${product.imageUrl}" alt="example1" />
            <p class="title">${product.name}</p>
            <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
            <a class="details-btn" href="/catalog/${product._id}">Details</a>
          </div>`
   
export async function catalogPage(ctx) {
  const products = await getOffers()


  ctx.render(catalogTemplate(products))
}