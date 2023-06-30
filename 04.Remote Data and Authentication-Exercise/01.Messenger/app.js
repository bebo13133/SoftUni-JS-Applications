function attachEvents() {
   document.getElementById("refresh").addEventListener('click', getMsg)
   document.getElementById('submit').addEventListener('click', createMsg)

}
function createMsg(){
const author = document.querySelector('input[name="author"]')
const content = document.querySelector("input[name='content']")
sendMsg({author:author.value,content:content.value})
author.value=""
content.value=""
}

async function getMsg (){
const response = await fetch(`http://localhost:3030/jsonstore/messenger`)
const data = await response.json()

const content = Object.values(data).map(x=>`${x.author}: ${x.content}`).join('\n')
document.getElementById('messages').textContent = content
}
async function sendMsg(obj){
const response =await fetch(`http://localhost:3030/jsonstore/messenger`,{
method:'post',
headers:{
    'Content-Type' : 'application/json'
},
body:JSON.stringify(obj)
})
const data = await response.json()
getMsg()


}

attachEvents();