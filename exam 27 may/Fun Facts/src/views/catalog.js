import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (facts) => html`
        <h2>Fun Facts</h2>
        <section id="dashboard">
        ${facts.length > 0 ? html`${facts.map(albumTemplate)}`: html`<h2>No Fun Facts yet.</h2>`}
       
          
        </section>`

const albumTemplate = (fact) => html`
 
 </div><div class="fact">
            <img src="${fact.imageUrl}" alt="example3" />
            <h3 class="category">${fact.category}ure</h3>
            <p class="description">${fact.description}</p>
            <a class="details-btn" href="/catalog/${fact._id}">More Info</a>
          </div>`
   
export async function catalogPage(ctx) {
  const facts = await getOffers()


  ctx.render(catalogTemplate(facts))
}