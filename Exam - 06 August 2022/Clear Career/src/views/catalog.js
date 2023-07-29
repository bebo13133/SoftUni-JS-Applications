import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (offers) => html`
  <section id="dashboard">
          <h2>Job Offers</h2>
            ${offers.length > 0 ? html`${offers.map(offerTemplate)}` : html`<h2>No offers yet.</h2>`}
          <!-- Display a div with information about every post (if any)-->
        
    </section>`
//TODO REPLACE DETAILS HREF
const offerTemplate = (offer) => html`
    <div class="offer">
            <img src="${offer.imageUrl}" />
            <p>
              <strong>Title: </strong><span class="title">${offer.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
            <a class="details-btn" href="/catalog/${offer._id}">Details</a>
    </div>`
export async function catalogPage(ctx) {
    const offers = await getOffers()
    ctx.render(catalogTemplate(offers))
}