import { html } from "../../node_modules/lit-html/lit-html.js"
//TODO replace with actual template

const homeTemplate = () => html`
   <section id="home">
          <img
            src="./images/beauty-g0d19af267_1920-removebg.png"
            alt="home"
          />
          <h2>Looking for the best beauty products?</h2>
          <h3>You are in the right place!</h3>
        </section>`

// const bookTemplate = (book) => html`
//     <li class="otherBooks">
//         <h3>To ${book.title}</h3>
//          <p>Type: ${book.type}</p>
//         <p class="img"><img src="${book.imageUrl}"></p>
//         <a class="button" href="/catalog/${book._id}">Details</a>
//     </li>
//    `

export async function homePage(ctx) {
    // const books = await getOffers()
    // console.log(books)
    console.log('Hello word')
    ctx.render(homeTemplate())
}
