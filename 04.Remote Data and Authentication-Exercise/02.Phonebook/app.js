function attachEvents() {
  document.querySelector('#btnLoad').addEventListener('click',onLoad)
  document.querySelector('#btnCreate').addEventListener('click', onCreate)
}
attachEvents();

async function onLoad(){
    const ul = document.getElementById('phonebook')
    ul.innerHTML=""
    const response = await fetch(`http://localhost:3030/jsonstore/phonebook`)
    const data = await response.json()
    // console.log(await data)
    Object.values(data).map(createLi)
}

 function createLi ({person, phone, _id}){
 const ul = document.getElementById('phonebook')
 const li = document.createElement('li')
 li.textContent = `${person}: ${phone}`
 li.id= _id
 const delBtn = document.createElement('button')
 delBtn.textContent ="Delete"
 delBtn.addEventListener('click',onDelete)
 ul.appendChild(li)
 li.appendChild(delBtn)
 }
 async function onDelete(e){
const id = e.target.parentNode.id
const response  = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`,{
    method:'DELETE'
})
const data = await response.json()
onLoad()
 }

async function onCreate(){
    const inputPerson = document.querySelector('#person')
    const inputPhone = document.querySelector('#phone')

    if(inputPerson.value ==""|| inputPhone.value ==""){
        alert('Please fill the input properly!')
        throw new Error('Please fill the input properly!')
    }

const body = JSON.stringify({
    person:inputPerson.value,
    phone:inputPhone.value,
})


const response = await fetch(`http://localhost:3030/jsonstore/phonebook`,{
    method:'POST',
    headers: {'Content-Type': 'application/json'
    },
   body
})
 inputPerson.innerHTML = ''
 inputPhone.innerHTML = ''
onLoad()
}
