import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (albums) => html`
      <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
          <!-- Display a li with information about every post (if any)-->
        ${albums.length >0 ? html`${albums.map(albumTemplate)}`: html`<h2>There are no albums added yet.</h2>`}
          
        </ul>

        <!-- Display an h2 if there are no posts -->

      </section>`

const albumTemplate = (album) => html`
   <li class="card">
            <img src="${album.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${album.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
            <a class="details-btn" href="/catalog/${album._id}">Details</a>
   </li>`
   
export async function catalogPage(ctx) {
  const albums = await getOffers()

  ctx.render(catalogTemplate(albums))
}