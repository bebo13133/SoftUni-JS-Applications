import { html, render } from '../node_modules/lit-html/lit-html.js';
import { mainTemplate } from './templates/mainTemplates.js';
import { createBooks, deleteBooks, getBooks, updateBooks } from './api.js'
import { tableRowsTemplate } from './templates/tableRowsTemplate.js';
import { onEdit } from './edit.js';
const root = document.body
render(mainTemplate(), root)
document.querySelector('#loadBooks').addEventListener('click', async (e) => {
    const dataBooks = await getBooks()

    const tableBody = document.querySelector('table tbody')

    const books = []

    for (const id in dataBooks) {
        books.push({
            author: dataBooks[id].author,
            title: dataBooks[id].title,
            _id: id
        })      
    }
  const ctx = {
    books, 
    onDelete,
    onEdit,
  }
    render(tableRowsTemplate(ctx), tableBody)
})

const addForm = document.querySelector('#add-form')
addForm.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title')
    const author = formData.get('author')
    if(!author || !title){
        const error= ('Field is Empty!')
        alert(error)
        throw new Error(error)
    }

    const dataBooks = {
        title: title,
        author: author
    }
    await createBooks(dataBooks)
    addForm.reset()
    document.querySelector('#loadBooks').click()
})

function onDelete(id){

    deleteBooks(id)
    document.querySelector('#loadBooks').click()

}

const editForm = document.querySelector('#edit-form')
editForm.addEventListener('submit', async (e)=>{
e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title')
    const id = formData.get('id')
    const author = formData.get('author')

    if(!author ||!title){
        const error= ('Field is Empty!')
        alert(error)
        throw new Error(error)
    }
    const dataBooks = {
        title: title,
        author: author
    }
    await updateBooks(dataBooks,id)
    editForm.reset()
    document.querySelector('#loadBooks').click()
    editForm.style.display = 'none'
    document.querySelector('#add-form').style.display = 'block'
})

