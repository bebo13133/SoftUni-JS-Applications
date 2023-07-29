import { html } from "../../node_modules/lit-html/lit-html.js"
//TODO replace with actual template

const homeTemplate = () => html`
 <section id="home">
          <h1>Welcome to our website, where curiosity meets enjoyment!
             Discover fascinating fun facts that engage and entertain everyone,
              inviting you to participate in the joy of learning something new together.</h1>
              <img id="logo-img" src="./images/logo.png" alt=""/>
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
