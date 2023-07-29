import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (cards) => html`
     <section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            ${cards.length >0 ? html`${cards.map(shoesTemplate)}`:html`<h2>There are no items added yet.</h2>`}            
          </ul>

        </section>
`

const shoesTemplate = (card) => html`
     <li class="card">
              <img src="${card.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${card.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${card.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${card.value}</span>$</p>
              <a class="details-btn" href="/catalog/${card._id}">Details</a>
            </li>
   `
export async function catalogPage(ctx) {
  const cards = await getOffers()
 
  ctx.render(catalogTemplate(cards))
}