import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../data/auth.js'
import { createSubmitHandler } from '../util.js'

const registerTemplate = (onRegister) => html`
       <section id="registerPage">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`

export async function registerPage(ctx) {

    console.log("Register")
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))
    //TODO: Change user object if you want
    async function onRegister({ email, password, ['conf-pass'] : repass }, form) {
        if (email == "" || password == "") {
            return alert('All fields are requirer')
        }
        if (repass != password) {
            return alert('Passwords do not match')
        }
        await register(email, password)
        form.reset()
        //TODO: Use redirection from requirements
        ctx.page.redirect('/')
    }
}