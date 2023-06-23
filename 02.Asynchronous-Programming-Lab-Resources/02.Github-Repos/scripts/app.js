function loadRepos() {
	const [userName, repos] = ["#username", "#repos"].map(selector => document.querySelector(selector))
	const url = `https://api.github.com/users/${userName.value}/repos`
	fetch(url)
		.then((response) => {
			repos.innerHTML = "";
			if (!response.ok) throw new Error("404 Not Found");
			return response.json();
		})
		.then((data) => {
			repos.innerHTML = "";

			data.forEach((e) => {
				let li = document.createElement('li')
				let a = document.createElement('a')

				a.textContent = e.full_name
				a.setAttribute('href', e.html_url)
				li.appendChild(a)
				repos.appendChild(li)
			});

		})
		.catch((err)=>
		{repos.innerHTML = `${err.message}`});
}