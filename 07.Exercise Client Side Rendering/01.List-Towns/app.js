import { html,render } from "./node_modules/lit-html/lit-html.js"

document.querySelector('#btnLoadTowns').addEventListener('click',(e)=>{
e.preventDefault()
const input = document.querySelector('#towns').value
const towns = input.split(", ")

const template =html`
  <ul>
    ${towns.map((t) => html`<li>${t}</li>`)}
  </ul>
`;
const rootElement= document.querySelector("#root")
render(template,rootElement)


})





const container = document.querySelector("#root");

document.querySelector(".content").addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(e.currentTarget);
  let towns = data.get("towns").split(", ");

  render(template(towns), container);
})