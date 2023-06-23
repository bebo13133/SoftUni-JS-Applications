async function solution() {
    const main = document.getElementById('main')
    const url = `http://localhost:3030/jsonstore/advanced/articles/list`

    const response = await fetch(url)
    const data = await response.json()
    data.forEach(e => {
        const divAcordion = createElement('div', '', "accordion")
        const divHead = createElement('div', '', 'head')
        const span = createElement('span', e.title)
        const moreButton = createElement("button", 'More', 'button', e._id)
        const extra = createElement('div', '', 'extra')
        let p = createElement('p')

        moreButton.addEventListener('click', onToggle)
        divAcordion.appendChild(divHead)
        divHead.appendChild(span)
        divHead.appendChild(moreButton)
        divAcordion.appendChild(extra)
        extra.appendChild(p)
        main.appendChild(divAcordion)

    });
    async function onToggle(e) {
        let accordion = e.target.parentElement.parentElement
        const url = `http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`
        const extra = accordion.querySelector('.extra')
        const res = await fetch(url)
        const dataRes = await res.json()
        const hidden = e.target.textContent === 'More'

        const pElem = accordion.querySelector("p")
        pElem.textContent = dataRes.content

        extra.style.display = hidden ? "block" : 'none'
        e.target.textContent = hidden ? 'Less' : 'More'
    }
    
    function createElement(type, content, className, idName) {
        let element = document.createElement(type);
        content ? element.textContent = content : '';
        className ? element.classList.add(className) : '';
        idName ? element.id = idName : '';
        return element;
    }
}
solution()