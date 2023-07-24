import page from '/node_modules/page/page.mjs'

import { catalogView } from './views/catalog.js'
import { registerView } from './views/register.js'
import { loginView } from './views/login.js'
import { editView } from './views/edit.js'
import { createView } from './views/create.js'
import { logoutView } from './views/logout.js'
import { detailsViews } from './views/details.js'
import { myFurnitureView } from './views/myFurniture.js'


document.getElementById('logoutBtn').addEventListener('click', logoutView)

export function updateNavi() {
    const guest = document.getElementById('guest')
    const user = document.getElementById('user')
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if (userData) {
        user.style.display = "inline-block"
        guest.style.display = 'none'
    } else {
        user.style.display = "none"
        guest.style.display = 'inline-block'
    }
}
updateNavi()

page('/', catalogView)
page('/register', registerView)
page('/login', loginView)
page('/create', createView)
page('/logout', logoutView)
page('/edit/:id', editView)
page('/details/:id', detailsViews)
page('/my-furniture', myFurnitureView)

page.start()

