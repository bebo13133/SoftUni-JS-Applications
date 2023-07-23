import{html} from '../../node_modules/lit-html/lit-html.js'
export const tableRowsTemplate =(ctx)=> html`
${ctx.books.map(book => tableRows(book,ctx.onDelete,ctx.onEdit))}`

const tableRows = (book,onDelete,onEdit) => html`
     <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${onEdit.bind(null,book._id)}>Edit</button>
            <button @click=${onDelete.bind(null,book._id)}>Delete</button>
        </td>
    </tr>

`