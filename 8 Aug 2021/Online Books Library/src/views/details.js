
import { html } from "../../node_modules/lit-html/lit-html.js"
import { getBook, getApplication, getUserApplication } from "../data/applications.js"
import { deleteOffer, getById } from "../data/offers.js"
import { getUserData } from "../util.js"
//TODO replace with actual template

const detailsTemplate = (book,onDelete,onBook) => html`
   <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    ${book.canEdit ? html`<a class="button" href="/catalog/${book._id}/edit">Edit</a>
                    <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>` : null}
               <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                   ${book.canLike ? html`<a @click=${onBook} class="button" href="javascript:void(0)">Like</a>`:null}
                  
                   <!-- ( for Guests and Users )  -->
                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${book.likes}</span>
                    </div>
                    <!-- Bonus -->
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
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
        const [book, likes, hasLikes] = await Promise.all(request)
        book.likes = likes

    if(userData && userData._id == book._ownerId){
        book.canEdit = true
    }
    if(userData && userData._id !== book._ownerId && hasLikes==0){
        book.canLike=true
    }

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete простотия')
        if(choice){
            await deleteOffer(id)
            ctx.page.redirect('/catalog')
        }
    }
    async function onBook(){
        await getBook(id)
        ctx.page.redirect(`/catalog/${id}`)
    }

    ctx.render(detailsTemplate(book,onDelete,onBook))
}