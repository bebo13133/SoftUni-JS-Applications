import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'
// import { catalogPage } from './views/catalog.js';
import { getUserData } from './util.js'
import { layoutTemplate } from './views/layout.js'
import { homePage } from './views/home.js'
import { loginPage } from './views/login.js'
import { registerPage } from './views/register.js'
import { logOut } from './data/auth.js'
 import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
 import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
// import { myBooksPage } from './views/myBooks.js';
//TODO: change  render root depending 


const root = document.querySelector('#wrapper');

page(decorateContext);
page('/index.html', '/');
page('/', homePage);
 page('/catalog', catalogPage);
page('/catalog/:id', detailsPage)
page('/catalog/:id/edit', editPage)
 page('/create', createPage)
  page('/login', loginPage)
  page('/register', registerPage)
 page('/logout', logoutAction)
//  page('/myBooks',myBooksPage);

page.start()



function decorateContext(ctx, next) {
    ctx.render = renderView;

    next();
}

//TODO: inject dependence
function renderView(content) {
    const userData = getUserData();
    render(layoutTemplate(userData, content), root)
}
function logoutAction(ctx) {
    logOut()
    ctx.page.redirect('/catalog')
}