import {get} from '../api.js'
import page from '../node_modules/page/page.mjs'
import { updateNavi } from '../app.js'

export async function logoutView(){
   await get('/users/logout')
   sessionStorage.clear()
   updateNavi()
   page.redirect('/')
}