import { del } from '../api.js'
import page from '../node_modules/page/page.mjs'

export async function onDelete(e){
    console.log(e.target.id)
   const confirmDelegation = confirm('are you sure you want to delete these Bullshit')
   if(confirmDelegation){
        del(`/data/catalog/${e.target.id}`)
        page.redirect('/')
      }
}
