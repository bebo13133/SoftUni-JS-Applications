
const url = `http://localhost:3030/jsonstore/collections/students`
const tbody = document.querySelector('#results tbody')
const form = document.querySelector('form')
window.addEventListener('load', onLoad)
form.addEventListener('submit', onCheck)

function onCheck(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
    onSubmit([...formData.entries()].reduce((acc, [k, v]) => Object.assign(acc, { [k]: v }), {}))
}
async function onLoad() {
    tbody.innerHTML = ''
    try {
        const response = await fetch(url)
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        const data = await response.json()
        Object.values(data).map(createElement)
    } catch (e) {

    }
}
    async function onSubmit(data) {
        if(data.firstName === '' || data.lastName === '' || data.facultyNumber === '' || data.grade === '' || isNaN(data.facultyNumber) || isNaN(data.grade)){
            alert('Please enter a valid input');
            throw new Error('Please enter a valid input');
        }
        try {
            const body = JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                facultyNumber: data.facultyNumber,
                grade: data.grade
            })

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            })
            const info = await response.json()
            form.reset()
            onLoad()

        } catch (e) {
            alert(e.message)
        }

    }
    function createElement({facultyNumber, firstName, grade, lastName, _id}){
        const tr = document.createElement('tr');
        tr.id = _id;
        const th1 = document.createElement('th');
        th1.textContent = firstName;
    
        const th2 = document.createElement('th');
        th2.textContent = lastName;
    
        const th3 = document.createElement('th');
        th3.textContent = facultyNumber;
    
        const th4 = document.createElement('th');
        th4.textContent = grade; 
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tbody.appendChild(tr);
    }

