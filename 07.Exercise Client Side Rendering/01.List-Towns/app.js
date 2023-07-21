import { html, render } from "./node_modules/lit-html/lit-html.js";

const [inputField, loadBtn, root] = ['#towns', '#btnLoadTowns', '#root'].map(selector => document.querySelector(selector))
loadBtn.addEventListener('click', onLoad);
const listTemplate = (data) => html`
<ul> 
${data.map(town => html`<li>${town}</li>`)}
</ul>
`
function onLoad(e) {
  e.preventDefault()
  if(inputField.value !=''){
    const towns = inputField.value.split(', ')
    render(listTemplate(towns), root)
    inputField.value = ''
  }

}