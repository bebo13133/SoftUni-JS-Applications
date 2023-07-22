import {html, render} from './node_modules/lit-html/lit-html.js';
const form = document.querySelector('form');
form.addEventListener('submit', onCheck);
const url = `http://localhost:3030/jsonstore/advanced/dropdown`;
async function getTown(){
    const response = await fetch(url)
    return Object.values(await response.json())
}
const townTemplate = (data) =>html`
${data.map(town=>html`<option value=${town._id}>${town.text}</option>`)}`
render(townTemplate(await getTown()),document.querySelector('#menu'))
function onCheck(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    addItem([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
}
async function addItem(info) {
   const body ={
    text: info.text 
   }
    const response = await fetch(url,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
 form.reset()
 render(townTemplate(await getTown()),menu)
}