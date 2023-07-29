import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/auth.js'
import { notify } from '../notify.js'
import { createSubmitHandler } from '../util.js'

const loginTemplate = (onLogin) => html`
<section id="login">
            <form id="login-form" @submit=${onLogin}>
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>`

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)))
    //TODO: Change user object if you want
    async function onLogin({ email, password }, form) {
        if (email == "" || password == "") {
            return notify('All fields are requirer')
        }
        await login(email, password)
        form.reset()
        //TODO: Use redirection from requirements
        ctx.page.redirect('/')
    }
}