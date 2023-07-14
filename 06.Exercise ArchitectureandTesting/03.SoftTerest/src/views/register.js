import { register } from "../api/users.js";

const section = document.querySelector('#register-page');
const form = section.querySelector('form')
let ctx = null

export function showRegister(context) {
    ctx = context
    context.showSection(section)
}

form.addEventListener('submit', onCheck);

function onCheck(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    onSubmit([...formData.entries()].reduce((acc, [k, v]) => Object.assign(acc, { [k]: v }), {}))
}
async function onSubmit(info) {
console.log(info)
   
    const body = {
        email: info.email,
        password: info.password,
    }

    await register(body)
    form.reset()
    ctx.updateNav()
    ctx.goTo('/')

}