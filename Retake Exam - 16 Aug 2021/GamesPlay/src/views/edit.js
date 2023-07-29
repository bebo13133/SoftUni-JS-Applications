import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js"
import { updateOffer } from "../data/offers.js"
import { getById } from "../data/offers.js"

const editTemplate = (game, onEdit) => html`
     <form @submit=${onEdit} id="edit">
        <div class="container">
            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="" .value=${game.title} />

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="" .value=${game.category} />

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value="" .value=${game.maxLevel} />

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="" .value=${game.imageUrl} />

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value=${game.summary}></textarea>
            <input class="btn submit" type="submit" value="Edit Game" />
        </div>
    </form>
</section>`
export async function editPage(ctx) {
  const id = ctx.params.id
  const game = await getById(id)

  ctx.render(editTemplate(game, createSubmitHandler(onEdit)))


  async function onEdit({ title,
    category,
    maxLevel,
    imageUrl,
    summary
  }) {
    if ([title,
      category,
      maxLevel,
      imageUrl,
      summary
    ].some(x => x == "")) {
      return alert("Please fill all fields!")
    }
    await updateOffer(id, {
      title,
      category,
      maxLevel,
      imageUrl,
      summary
    })
    ctx.page.redirect(`/catalog/${id}`)
  }
}