import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (cards) => html`
  <section id="dashboard">
  <h2 class="dashboard-title">Services for every animal</h2>
  <div class="animals-dashboard">
            ${cards.length > 0 ? html`${cards.map(offerTemplate)}` 
            : html`<div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`}
          <!-- Display a div with information about every post (if any)-->
  </div>
    </section>`

const offerTemplate = (card) => html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src="${card.image}">
        </article>
        <h2 class="name">${card.name}</h2>
        <h3 class="breed">${card.breed}</h3>
        <div class="action">
            <a class="btn" href="/catalog/${card._id}">Details</a>
        </div>
    </div>
   `
export async function catalogPage(ctx) {
  const cards = await getOffers()
  console.log(cards)
  ctx.render(catalogTemplate(cards))
}