import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchAlbum } from "../data/offers.js"

const searchTemplate = (isClicked, onSearch, fruits) => html`
      <section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSearch}>
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>

${isClicked ? html`
<div class="search-result">
${fruits.length > 0 ? html`${fruits.map(albumTemplate)}` : html`<p class="no-result">No result.</p>`}`
: html`<p class="no-result">No result.</p>`}

  </div>
</section>`

const albumTemplate = (fruit) => html`<div class="fruit">
        <img src="${fruit.imageUrl}" alt="example1" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
      </div>`

export async function searchPage(ctx) {

    ctx.render(searchTemplate(false, onSearch))

    async function onSearch(e) {
        e.preventDefault()
        const input = document.querySelector("#search-input")
        const query = input.value
        if (!query) return alert("Нема такава простотия!!!")

        const fruits = await searchAlbum(query)
        console.log(fruits)
        ctx.render(searchTemplate(true, onSearch, fruits))
    }

}