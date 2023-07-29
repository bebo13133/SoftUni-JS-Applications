import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (events) => html`
          <h2>Current Events</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
       ${events.length > 0 ? html`${events.map(albumTemplate)}`: html`<h4>No Events yet.</h4>`} 
          
        </section> `

const albumTemplate = (event) => html`
   <div class="event">
            <img src="${event.imageUrl}" alt="example1" />
            <p class="title">${event.name}</p>
            <p class="date">${event.date}</p>
            <a class="details-btn" href="/catalog/${event._id}">Details</a>
          </div>`
   
export async function catalogPage(ctx) {
  const events = await getOffers()


  ctx.render(catalogTemplate(events))
}