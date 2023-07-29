
import { html } from "../../node_modules/lit-html/lit-html.js"
import { donate, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (memes,userData) => html`
   <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
                <div class="user-content">
                    <p>Username: ${userData.username}</p>
                    <p>Email: ${userData.email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                <!-- Display : All created memes by this user (If any) --> 
                ${memes.length > 0 ? html`${memes.map(memeTemplate)}`: html`<p class="no-memes">No memes in database.</p>`}
                <!-- Display : If user doesn't have own memes  --> 
              
            </div>
        </section>`
        const memeTemplate = (meme) => html`<div class="user-meme">
        <p class="user-meme-title">J${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
        <a class="button" href="/catalog/${meme._id}">Details</a>
    </div>`
// 
export async function profilePage(ctx) {
    const id = ctx.params.id
    const userData = getUserData()

const memes = await getApplication(userData._id)

    ctx.render(detailsTemplate(memes,userData))
}