import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchAlbum } from "../data/offers.js"

const searchTemplate = (isClicked, onSearch, shoes) => html`
     <section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf" @submit=${onSearch}>
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          ${isClicked ? html`
          <div id="search-container">
          <ul class="card-wrapper">
            ${shoes.length > 0 ? html`${shoes.map(albumTemplate)}` : html`<h2>There are no results found.</h2>`}` : html`<h2>There are no results found.</h2>`}          
            </ul>
          </div>
        </section>`

const albumTemplate = (shoe) => html`
<li class="card">
<img src="${shoe.imageUrl}" alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${shoe.brand}/span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${shoe.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
${JSON.parse(sessionStorage.getItem('userData')) ? html`<a class="details-btn" href="/catalog/${shoe._id}">Details</a>` : null}

</li>`

export async function searchPage(ctx) {

    ctx.render(searchTemplate(false, onSearch))

    async function onSearch(e) {
        e.preventDefault()
        const input = document.getElementById("#search-input")
        const query = input.value
        console.log(query)
        if (!query) return alert("Нема такава простотия!!!")

        const shoes = await searchAlbum(query)
        
        ctx.render(searchTemplate(true, onSearch, shoes))
    }

}