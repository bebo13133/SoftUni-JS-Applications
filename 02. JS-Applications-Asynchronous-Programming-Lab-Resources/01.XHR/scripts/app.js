function loadRepos() {
   const url = 'https://api.github.com/users/testnakov/repos';
   let request = new XMLHttpRequest();
   request.addEventListener('readystatechange', onState)
request.open("GET", url)
request.send()

   function onState(e) {
      if (request.readyState  == 4 && request.status == 200) {
         document.getElementById('res').textContent = request.responseText
      }
   }
}