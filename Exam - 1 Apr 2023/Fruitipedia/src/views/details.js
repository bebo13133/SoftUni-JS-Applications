
import { html } from "../../node_modules/lit-html/lit-html.js"
import { donate, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (fruit,onDelete) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${fruit.nutrition}</p>
              </div>
               <!--Edit and Delete are only for creator-->
            ${fruit.canEdit ? html` <div id="action-buttons">
            <a href="/catalog/${fruit._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
          </div>`: null}
         
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
const fruit = await getById(id)
console.log(fruit)
    // if (userData) {
    //     request.push(getUserApplication(id, userData._id))
    // }
    // const [album, donates, hasDonate] = await Promise.all(request)
    // album.donates = donates

    if (userData && userData._id == fruit._ownerId) {
        fruit.canEdit = true
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

    ctx.render(detailsTemplate(fruit, onDelete,))
}