import { getIdeas } from "../api/data.js";

const section = document.querySelector('#dashboard-holder');
section.addEventListener('click',onDetailsSelect)

let ctx = null
export async function showCatalog(context){
    ctx= context
    context.showSection(section)
    const ideas= await getIdeas()
    section.replaceChildren(...ideas.map(onCreateIdea))
    if(ideas.length == 0){
        section.innerHTML = `<h1>No ideas yet! Be the first one :)</h1>`
    }
}

function onCreateIdea(idea){

const div = document.createElement('div')
div.className = 'card overflow-hidden current-card details'
div.style.height = '18rem'
div.style.width = '20rem'
div.innerHTML=`
<div class="card-body">
    <p class="card-text">${idea.title}</p>
</div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a data-id="${idea._id}" class="btn" href="/details">Details</a>
`
return div
}

function onDetailsSelect(e){
 
    if(e.target.tagName =="A"){
        e.preventDefault()
        const id = e.target.dataset.id;
        if(id){
            ctx.goTo('/details',id)
        }
    }
}
