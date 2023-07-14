
const [main, homePage, registerPage, loginPage, createPage, navForm, catalog, detailsPage] =
    ['main', '#home-page', 'register-page', '#login-page', '#create-page', 'nav', '#dashboard-holder', '#details-page']
        .map(selector => document.querySelector(selector));
document.getElementById('views').remove()

const links = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/details': detailsPage,
    '/create': createPage,
    '/catalog': catalog


}

window.showSection = (name) => {
    const section = links[name]
    main.replaceChildren(section)

}