import {render} from '../node_modules/lit-html/lit-html.js'
import { getBookId } from './api.js'
import { editTemplate } from './templates/forms.js'

export async function onEdit(id){
   document.getElementById('add-form').style.display = 'none'
   const book = await getBookId(id)
   const editForm = document.getElementById('edit-form')
   editForm.style.display = 'block'
   render(editTemplate(book,id), editForm)
}