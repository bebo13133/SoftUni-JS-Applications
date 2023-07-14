





export function initialize(links) {
const [main, navForm] = ['main', 'nav'].map(selector => document.querySelector(selector));
navForm.addEventListener('click', onNavigate)
    const context = {
        showSection,
        goTo,
        updateNav
    }
    return context

    function showSection(section) {
        main.replaceChildren(section)

    }


    function onNavigate(e) {
        let target = e.target
        if (target.tagName == 'IMG') {
            target = target.parentElement
        }
        if (target.tagName == "A") {
            e.preventDefault()
            const url = new URL(target.href)
            goTo(url.pathname)
            // console.log(url.pathname)
        }
    }

     function updateNav(){
        const user = localStorage.getItem('user')
        if(user){
            navForm.querySelectorAll('.user').forEach(x=>x.style.display='block')
            navForm.querySelectorAll('.guest').forEach(x=>x.style.display = 'none')

        }else{
            navForm.querySelectorAll('.user').forEach(x=>x.style.display='none')
            navForm.querySelectorAll('.guest').forEach(x=>x.style.display = 'block')
        }
    }

    function goTo(name, ...params) {
        const handler = links[name]
        if (typeof handler == 'function') {
            handler(context, ... params)
        }
    }

}

