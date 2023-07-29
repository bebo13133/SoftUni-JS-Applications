import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../data/auth.js'
import { createSubmitHandler } from '../util.js'

const registerTemplate = (onRegister) => html`
          <section id="register-page" class="register">
            <form id="register-form" action="" method="" @submit=${onRegister}>
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`

export async function registerPage(ctx) {

    console.log("Register")
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))
    //TODO: Change user object if you want
    async function onRegister({ email, password, ['confirm-pass'] : repass }, form) {
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