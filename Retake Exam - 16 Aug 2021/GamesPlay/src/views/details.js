
import { html,nothing } from "../../node_modules/lit-html/lit-html.js"
// import { donate, getApplication, } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
import { commentFormView } from "./commentForm.js"
import { commentsView } from "./comments.js"
//TODO replace with actual template

const detailsTemplate = (game,onDelete,commentFormSection,commentsSection) => html`
            <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}"/>
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">${game.summary}</p>
                ${commentsSection}
               
              
                ${game.canEdit ? html`<div class="buttons">
                    <a href="/catalog/${game._id}/edit" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`: null}
              
            </div>
            
            ${commentFormSection}

        </section>`
// 
export async function detailsPage(ctx) {
    const id = ctx.params.id
    const userData = getUserData()
    
    const request = [
        getById(id),
        // getApplication(id),
    commentsView(id)
     ]
const commentFormSection = commentFormView(ctx)
     
        const [game, commentsSection ] = await Promise.all(request)
    

    if(userData && userData._id == game._ownerId){
        game.canEdit = true
    }
 

    async function onDelete(){
        const choice = confirm('Are you sure?')
        if(choice){
            await deleteOffer(id)
            ctx.page.redirect('/')
        }
    }
    // async function onLike(){
    //     await getBook(id)
    //     ctx.page.redirect(`/catalog/${id}`)
    // }

    ctx.render(detailsTemplate(game,onDelete,commentFormSection,commentsSection))
}