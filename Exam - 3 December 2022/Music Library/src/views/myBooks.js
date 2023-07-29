import { html } from "../../node_modules/lit-html/lit-html.js"
import { getOwnerBook } from "../data/offers.js"
import { getUserData } from "../util.js"

//TODO replace with actual template

const myBooksTemplate = (books) => html`
     <section id="my-books-page" class="my-books">
            <h1>My Books</h1>
            <!-- Display ul: with list-items for every user's books (if any) -->
            <ul class="my-books-list">
          ${books.length > 0 ? html`${books.map(bookTemplate)}` : html`<p class="no-books">No books in database!</p>`}
            </ul>

            <!-- Display paragraph: If the user doesn't have his own books  -->
           
        </section>`

const bookTemplate = (book) => html`
  <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src="${book.imageUrl}"></p>
                    <a class="button" href="/catalog/${book._id}">Details</a>
                </li>`

export async function myBooksPage(ctx) {
    const userData = getUserData()

    const books = await getOwnerBook(userData._id)


    ctx.render(myBooksTemplate(books))
}

