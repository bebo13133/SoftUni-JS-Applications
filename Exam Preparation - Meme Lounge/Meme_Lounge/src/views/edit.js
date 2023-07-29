import { html } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js"
import { updateOffer } from "../data/offers.js"
import { getById } from "../data/offers.js"
import { notify } from "../notify.js"

const editTemplate = (meme, onEdit) => html`
    <section id="edit-meme">
            <form id="edit-form" @submit=${onEdit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`
export async function editPage(ctx) {
  const id = ctx.params.id
  const meme = await getById(id)

  ctx.render(editTemplate(meme, createSubmitHandler(onEdit)))


  async function onEdit({ title,
    description,
    imageUrl
  }) {
    if ([title,
      description,
      imageUrl
    ].some(x => x == "")) {
      return notify("Please fill all fields!")
    }
    await updateOffer(id, {
      title,
      description,
      imageUrl
    })
    ctx.page.redirect(`/catalog/${id}`)
  }
}