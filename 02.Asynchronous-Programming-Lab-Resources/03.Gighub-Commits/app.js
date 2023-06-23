function loadCommits() {

    const [userName, repo,commits] = ['#username', "#repo", '#commits']
    .map(selector=>document.querySelector(selector));

    let url ='https://api.github.com/repos'
    fetch(`${url}/${userName.value}/${repo.value}/commits`)

    .then(response =>{
        commits.innerHTML= "";
        if(!response.ok) throw new Error(`${response.status}`)
        return response.json()
})
.then(data =>{
commits.innerHTML='';
data.forEach(e => {
  let li = document.createElement('li')
  li.textContent = `${e.commit.author.name}: ${e.commit.message}`  
commits.appendChild(li)
});

})
.catch(err=>{
    commits.textContent = err.message
})

}