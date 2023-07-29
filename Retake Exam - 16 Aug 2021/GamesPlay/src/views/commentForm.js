import { html,nothing } from "../../node_modules/lit-html/lit-html.js"
import { createSubmitHandler } from "../util.js"

import * as commentsService from '../data/applications.js'

const formTemplate = (onSubmit) => html`
<article class="create-comment">
<label>Add new comment:</label>
<form class="form" @submit=${onSubmit}>
    <textarea name="comment" placeholder="Comment......"></textarea>
    <input class="btn submit" type="submit" value="Add Comment">
</form>
</article>` 


export function commentFormView(ctx){
    if(ctx.user){
        return formTemplate(createSubmitHandler(ctx,onSubmit))
    }else{
        return nothing;
    }
}
async function onSubmit(ctx,data,event){
    const gameID = ctx.params.id
    await commentsService.postComment({
        gameID,
        comment: data.comment
    })
    event.target.reset()
        ctx.page.redirect(`/catalog/${game._id}`)
}