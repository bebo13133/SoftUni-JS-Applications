import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (memes) => html`
    <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
				<!-- Display : All memes in database ( If any ) -->
           ${memes.length >0 ? html`${memes.map(memeTemplate)}`: html`<p class="no-memes">No memes in database.</p>`} 

				
			</div>
        </section>`

const memeTemplate = (meme) => html`
    <div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${meme.title}</p>
                            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/catalog/${meme._id}">Details</a>
                        </div>
                    </div>
                </div>`
export async function catalogPage(ctx) {
  const memes = await getOffers()
  // console.log(fruits)
  ctx.render(catalogTemplate(memes))
}