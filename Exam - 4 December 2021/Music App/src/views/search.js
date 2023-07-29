import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchAlbum } from "../data/offers.js"

const searchTemplate = (isClicked,onSearch,albums) => html`
   <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            ${isClicked ? html`
            <div class="search-result">
            ${albums.length >0 ? html`${albums.map(albumTemplate)}`: html`<p class="no-result">No result.</p>`}
            </div>           
            `:html`<p class="no-result">No result.</p>`}
            
                <!--If have matches-->
             

                <!--If there are no matches-->
               
            </div>
        </section>`

        const albumTemplate = (album)=>html`<div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${JSON.parse(sessionStorage.getItem('userData'))? html`<div class="btn-group">
                        <a href="/catalog/${album._id}" id="details">Details</a>
            </div>`:null}
        </div>
    </div>`

export async function searchPage(ctx) {
      
    ctx.render(searchTemplate(false,onSearch))

    async function onSearch(e){
        const input= document.querySelector("#search-input")
        const query = input.value
        if(!query) return alert("Нема такава простотия!!!")
       const albums = await searchAlbum(query)
       console.log(albums)
       ctx.render(searchTemplate(true,onSearch,albums))
    }

    }