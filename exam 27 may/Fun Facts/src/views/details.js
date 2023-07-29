
import { html } from "../../node_modules/lit-html/lit-html.js"
import { getBook, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (fact,onDelete,onLike) => html`
       <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fact.imageUrl}" alt="example1" />
            <p id="details-category">${fact.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${fact.description}</p>
                   <p id ="more-info">${fact.moreInfo}</p>
              </div>

              <h3>Likes:<span id="likes">${fact.likes}</span></h3>

          <div id="action-buttons">
          ${fact.canEdit ? html`<a href="/catalog/${fact._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`: null}


            ${fact.canLike ? html`<a @click=${onLike}  href="javascript:void(0)" id="like-btn">Like</a>`:null}

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
        const [fact, likes, hasLikes] = await Promise.all(request)
        fact.likes= likes

    if(userData && userData._id == fact._ownerId){
      fact.canEdit = true
    }
    if(userData && userData._id !== fact._ownerId && hasLikes==0){
      fact.canLike=true
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

    ctx.render(detailsTemplate(fact,onDelete,onLike))
}