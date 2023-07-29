import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../data/auth.js'
import { notify } from '../notify.js'
import { createSubmitHandler } from '../util.js'

const registerTemplate = (onRegister) => html`
             <section id="register">
            <form id="register-form" @submit=${onRegister}>
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>`

export async function registerPage(ctx) {

    console.log("Register")
    ctx.render(registerTemplate(createSubmitHandler(onRegister)))
    //TODO: Change user object if you want
    async function onRegister({username, email, password, ['repeatPass'] : repass },gender, form) {
        if (username == "" ||email == "" || password == "") {
            return notify('All fields are requirer')
        }
        if (repass != password) {
            return notify('Passwords do not match')
        }
        await register(username,email, password)
        form.reset()
        //TODO: Use redirection from requirements
        ctx.page.redirect('/')
    }
}