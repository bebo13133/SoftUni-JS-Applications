import { html } from "../../node_modules/lit-html/lit-html.js"
//TODO replace with actual template

const homeTemplate = () => html`
  <section id="home">
        <img src="./images/landing.png" alt="home" />

        <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
            here!</span></h2>
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
    console.log('Hello')
    ctx.render(homeTemplate())
}
