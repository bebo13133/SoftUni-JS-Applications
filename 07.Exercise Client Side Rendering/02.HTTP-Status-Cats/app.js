import { html, render } from './node_modules/lit-html/lit-html.js'
import { cats } from './catSeeder.js'
import{styleMap} from './node_modules/lit-html/directives/style-map.js'
cats.forEach(c => c.action = "Show")
const section = document.getElementById('allCats')

const catTemplate = (data) => html`<ul>
${data.map((cat) => html`
   <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
           <div class="info">
                <button class="showBtn" @click=${(e) => onShow(e, cat)}>${cat.action} status code</button>
                <div class="status" style="${styleMap({display: cat.action == 'Show'? 'none':'block'})}" id="${cat.id}">
                    <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
                    <p class="card-text">${cat.statusMessage}</p>
                </div>
            </div>
    </li>
`)}
</ul>
`
function onShow(e, data) {
data.action = data.action=="Show"? "Hide":"Show"
render(catTemplate(cats), section)
}
render(catTemplate(cats), section)