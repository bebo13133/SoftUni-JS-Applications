import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (games) => html`
     <section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->
          ${games.length > 0 ? html`${games.map(gameTemplate)}`: html`<h3 class="no-articles">No articles yet</h3>`}
           

            <!-- Display paragraph: If there is no games  -->
           
        </section>`

const gameTemplate = (game) => html`
     <div class="allGames">
                <div class="allGames-info">
                    <img src="${game.imageUrl}">
                    <h6>${game.category}ion</h6>
                    <h2>${game.title}</h2>
                    <a href="/catalog/${game._id}" class="details-button">Details</a>
                </div>
      </div>`
export async function catalogPage(ctx) {
  const games = await getOffers()

  ctx.render(catalogTemplate(games))
}