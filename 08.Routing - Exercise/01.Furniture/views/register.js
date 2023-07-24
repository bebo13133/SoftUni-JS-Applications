import {html, render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { updateNavi } from '../app.js'
import{post} from '../api.js'


export async function registerView(){
    render(registerTemplate(),document.querySelector('.container'))
}


const registerTemplate = () => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit="${onSubmit}">
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>`

        async function onSubmit(e){
            e.preventDefault();
            const formData = new FormData(e.target)

            const email = formData.get('email')
            const password = formData.get('password')
            const rePass = formData.get('rePass')
            if(password!== rePass){
                alert('Passwords do not match!')
                throw new Error('Passwords do not match!')
            }
            if(email == '' || rePass == '' || password == '') {
                alert('Please fill all fields!')
                throw new Error('Some fields is requite')
             }

            const data = await post('/users/register', {email,password})
           
               
               

                const userData = {
                    id: data._id,
                    email: data.email,
                    accessToken: data.accessToken,
                }
                sessionStorage.setItem('userData',JSON.stringify(userData))
                updateNavi()
                page.redirect('/')  
        }