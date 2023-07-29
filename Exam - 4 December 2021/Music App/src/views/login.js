import { html } from '../../node_modules/lit-html/lit-html.js'
import { login } from '../data/auth.js'
import { createSubmitHandler } from '../util.js'

const loginTemplate = (onLogin) => html`
   <section id="loginPage">
            <form @submit=${onLogin}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
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
        ctx.page.redirect('/catalog')
    }
}