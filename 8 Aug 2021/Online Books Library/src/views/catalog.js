import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOffers } from "../data/offers.js"
//TODO replace with actual template

const catalogTemplate = (books) => html`
   <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            <!-- Display ul: with list-items for All books (If any) -->
            <ul class="other-books-list">
            ${books.length > 0 ? html`${books.map(bookTemplate)}`: html`<p class="no-books">No books in database!</p>`}
            </ul>
</section>`

const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>To ${book.title}</h3>
         <p>Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <a class="button" href="/catalog/${book._id}">Details</a>
    </li>`
   
export async function catalogPage(ctx) {
  const books = await getOffers()

  ctx.render(catalogTemplate(books))
}