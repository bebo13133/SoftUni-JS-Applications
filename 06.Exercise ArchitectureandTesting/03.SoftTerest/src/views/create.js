import { createIdea } from "../api/data.js";

const section = document.querySelector('#create-page');
const form = section.querySelector('form')
let ctx = null

export function onCreate(context){
    ctx = context

    context.showSection(section)
}
form.addEventListener('submit',async (e)=>{
e.preventDefault()
const formData = new FormData(form)
const title = formData.get('title')
const description = formData.get('description')
const img = formData.get('imageURL')

await createIdea({
title,
description,
img
})

form.reset()

ctx.goTo('/catalog')

})