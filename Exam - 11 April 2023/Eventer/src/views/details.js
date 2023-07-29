
import { html } from "../../node_modules/lit-html/lit-html.js"
import { getBook, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (event,onDelete,onLike) => html`
     <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${event.imageUrl}" alt="example1" />
            <p id="details-title">${event.name}</p>
            <p id="details-category">
              Category: <span id="categories">${event.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${event.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${event.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${event.likes}</span> times.</h3>

            <!--Edit and Delete are only for creator-->
          
            <div id="action-buttons">
            ${event.canEdit ? html`<a href="/catalog/${event._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`: null}

              <!--Bonus - Only for logged-in users ( not authors )-->
              ${event.canLike ? html` <a @click=${onLike} href="javascript:void(0)" id="go-btn">Going</a>` : null}
             
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
        const [event, likes, hasLikes] = await Promise.all(request)
        event.likes = likes

    if(userData && userData._id == event._ownerId){
      event.canEdit = true
    }
    if(userData && userData._id !== event._ownerId && hasLikes==0){
      event.canLike=true
    }

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete простотия')
        if(choice){
            await deleteOffer(id)
            ctx.page.redirect('/catalog')
        }
    }
    async function onLike(){
        await getBook(id)
        ctx.page.redirect(`/catalog/${id}`)
    }

    ctx.render(detailsTemplate(event,onDelete,onLike))
}