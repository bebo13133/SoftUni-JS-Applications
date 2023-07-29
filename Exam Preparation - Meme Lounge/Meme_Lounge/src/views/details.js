
import { html } from "../../node_modules/lit-html/lit-html.js"
import { donate, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (meme,onDelete) => html`
      <section id="meme-details">
            <h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${meme.description}</p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    ${meme.canEdit ? html`<a class="button warning" href="/catalog/${meme._id}/edit">Edit</a>
                    <button @click=${onDelete}  class="button danger">Delete</button>` : null}
                  
                    
                </div>
            </div>
</section>`
// 
export async function detailsPage(ctx) {
    const id = ctx.params.id
    const userData = getUserData()

    // const request = [
    //     getById(id),
    //     // getApplication(id)
    // ]
const meme = await getById(id)

    // if (userData) {
    //     request.push(getUserApplication(id, userData._id))
    // }
    // const [album, donates, hasDonate] = await Promise.all(request)
    // album.donates = donates

    if (userData && userData._id == meme._ownerId) {
        meme.canEdit = true
    }
    // if (userData && userData._id !== album._ownerId) {

    // }

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete простотия')
        if (choice) {
            await deleteOffer(id)
            ctx.page.redirect('/catalog')
        }
    }
    // async function onDonate() {
    //     await donate(id)
    //     ctx.page.redirect(`/catalog/${id}`)
    // }

    ctx.render(detailsTemplate(meme, onDelete,))
}