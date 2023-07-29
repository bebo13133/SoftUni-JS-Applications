
import { html } from "../../node_modules/lit-html/lit-html.js"
import { donate, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (card,onDelete,onDonate) => html`
    <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${card.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${card.name}</h1>
                        <h3>Breed: ${card.breed}</h3>
                        <h4>Age: ${card.age} years</h4>
                        <h4>Weight: ${card.weight}</h4>
                        <h4 class="donation">Donation: ${card.donates}00$</h4>
                    </div>
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                      ${card.canEdit ? html`<a href="/catalog/${card._id}/edit" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`:null}
                        <!-- Only for registered user and creator of the pets-->
                       
                        <!--(Bonus Part) Only for no creator and user-->
                       
                        ${card.canDonate ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`: null}
                    </div>
                </div>
            </div>
        </section>`
// 
export async function detailsPage(ctx) {
    const id = ctx.params.id
    const userData = getUserData()
    
    const request = [
        getById(id),
        getApplication(id)
    ]

        if(userData){
            request.push(getUserApplication(id, userData._id))
        }
        const [card, donates, hasDonate] = await Promise.all(request)
        card.donates = donates

    if(userData && userData._id == card._ownerId){
        card.canEdit = true
    }
    if(userData && userData._id !== card._ownerId && hasDonate==0){
        card.canDonate=true
    }

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete простотия')
        if(choice){
            await deleteOffer(id)
            ctx.page.redirect('/catalog')
        }
    }
    async function onDonate(){
        await donate(id)
        ctx.page.redirect(`/catalog/${id}`)
    }

    ctx.render(detailsTemplate(card,onDelete,onDonate))
}