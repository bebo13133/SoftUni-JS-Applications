import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/auth.js'
import { createSubmitHandler } from '../util.js'

const loginTemplate = (onLogin) => html`
 <section id="login-page" class="auth">
            <form id="login" @submit=${onLogin}>

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>`

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)))
    //TODO: Change user object if you want
    async function onLogin({ email, password }, form) {
        if (email == "" || password == "") {
            return alert('All fields are requirer')
        }
        await login(email, password)
        form.reset()
        //TODO: Use redirection from requirements
        ctx.page.redirect('/')
    }
}