import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (fruits) => html`
     <h2>Fruits</h2>
        <section id="dashboard">
         ${fruits.length>0? html`${fruits.map(fruitTemplate)}`:html`<h2>No fruit info yet.</h2>`} <!-- Display a div with information about every post (if any)-->
                  
        </section>`

const fruitTemplate = (fruit) => html`
   <div class="fruit">
            <img src="${fruit.imageUrl}" alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
          </div>
   `
export async function catalogPage(ctx) {
  const fruits = await getOffers()
  console.log(fruits)
  ctx.render(catalogTemplate(fruits))
}