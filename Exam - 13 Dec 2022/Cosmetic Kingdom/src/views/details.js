
import { html } from "../../node_modules/lit-html/lit-html.js"
import { getBook, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (product,onDelete,onLike) => html`
     <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${product.imageUrl}" alt="example1" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${product.likes}</span> times.</h4>
                <span>${product.description}</span
                >
              </div>
            </div>

            <!--Edit and Delete are only for creator-->
           
            <div id="action-buttons">
              
            ${product.canEdit? html`<a href="/catalog/${product._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`:null}
              <!--Bonus - Only for logged-in users ( not authors )-->
              ${product.canLike? html`<a @click=${onLike} href="javascript:void(0)" id="buy-btn">Buy</a>`:null}
             
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
        const [product, likes, hasLikes] = await Promise.all(request)
        product.likes = likes

    if(userData && userData._id == product._ownerId){
      product.canEdit = true
    }
    if(userData && userData._id !== product._ownerId && hasLikes==0){
      product.canLike=true
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

    ctx.render(detailsTemplate(product,onDelete,onLike))
}