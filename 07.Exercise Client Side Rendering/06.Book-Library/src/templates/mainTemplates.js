import {html} from '../../node_modules/lit-html/lit-html.js'
import { loadBtnTemplate } from './loadTemplates.js'
import { addTemplate, editTemplate } from './forms.js'
 import { tableTemplate } from './tableTemplates.js'
export const mainTemplate = () => html`
${loadBtnTemplate()} ${tableTemplate()}

<form id="add-form">
${addTemplate()}
</form>
 <form id="edit-form" style="display:none"></form>
`