import { login } from "../api/users.js";

const section = document.querySelector('#login-page');
const form = section.querySelector('form')

form.addEventListener('submit', onCheck)

function onCheck(e){
e.preventDefault()
const formData = new FormData(e.target)

onSubmit([...formData.entries()].reduce((acc,[k,v])=>Object.assign(acc,{[k]:v}),{}))
}

let ctx = null;
export function showLogin(context) {
    ctx= context
    context.showSection(section)
}


async function onSubmit(info){
   
if(info.email =="" || info.password ==''){
    throw new Error('All fields are required!')
}
const body = {
    email: info.email,
    password: info.password,
}

await login(body)
ctx.updateNav()
form.reset()

ctx.goTo('/')

}