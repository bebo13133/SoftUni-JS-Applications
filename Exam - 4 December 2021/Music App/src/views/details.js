
import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (album, onDelete) => html`
   <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src="${album.imgUrl}">
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>${album.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                    ${album.canEdit ? html`  <div class="actionBtn">
                        <a href="/catalog/${album._id}/edit" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
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
const album = await getById(id)
console.log(album)
    // if (userData) {
    //     request.push(getUserApplication(id, userData._id))
    // }
    // const [album, donates, hasDonate] = await Promise.all(request)
    // album.donates = donates

    if (userData && userData._id == album._ownerId) {
        album.canEdit = true
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

    ctx.render(detailsTemplate(album, onDelete,))
}