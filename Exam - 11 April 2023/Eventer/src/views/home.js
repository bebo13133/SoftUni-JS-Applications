import { html } from "../../node_modules/lit-html/lit-html.js"
//TODO replace with actual template

const homeTemplate = () => html`
    <section id="home">
          <div class="home-intro">
            <h1 class="fancy">Welcome to our community-driven events website! We believe that the best events
              come from the community.</h1>
               
               <p>So why wait? Join our community today and start 
                 discovering and sharing the best events in your area!</p>
                 <a class="event-btn" href="/catalog">To Events</a>       
          </div>
          <img class="party-img" src="./images/party people.png" alt="event">
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
