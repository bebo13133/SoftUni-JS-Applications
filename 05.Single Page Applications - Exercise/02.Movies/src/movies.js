import { routes } from "./router.js";

const catalog = document.querySelector('#movies-list');
const addMovieForm = document.querySelector('#add-movie-form');
const editForm = document.querySelector('form[data-id="edit-form"]');

const baseUrl = 'http://localhost:3030/data/movies';

// GET Movies
export async function getMovies(id) {
    let url = baseUrl;

    if (id) {
        url += `/${id}`
    }
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch(err) {
        alert(err);
    }
}

// ADD Movie
export function addMovie() {
    addMovieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(addMovieForm);
        const title = data.get('title');
        const description = data.get('description');
        const img = data.get('img');
        const token = sessionStorage.getItem("accessToken");

        // Input Validation
        if (title == '' || description == '' || img == '') {
            return alert('Empty input field');
        }

        const body = {
            title: title,
            description: description,
            img: img
        }
        
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "X-Authorization": `${token}`
        },
            body: JSON.stringify(body)
        }

        fetch(baseUrl,options)
        .then(res => res.json())
        .then(() => {
            routes.showHome();
            displayMovies();
        }).catch(err => {
            alert(err);
        })
    })
}

export async function displayMovies() {
    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}


function createMoviePreview(movie) {
    const li = document.createElement('li');
    const divCard = document.createElement('div');
    const divBody = document.createElement('div');
    const divFooter = document.createElement('div');
    const spanHidden = document.createElement('span');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');
    const a = document.createElement('a');
    const button = document.createElement('button');

    divCard.className = 'card mb-4';
    divBody.className = 'card-body';
    divFooter.className = 'card-footer';
    img.className = 'card-img-top';
    img.src = movie.img;
    img.setAttribute('alt', 'Card image cap');
    img.width = '400';
    h4.className = 'card-title';
    h4.textContent = movie.title;
    a.href = `#/details/${movie._id}`;
    a.setAttribute('data-id', movie._id);
    button.type = 'button';
    button.className = 'btn btn-info';
    button.textContent = 'Details';
    button.setAttribute('data-id',movie._id);
    spanHidden.style.display = 'none';
    spanHidden.className = 'hidden';
    spanHidden.textContent = movie.description;

    divBody.appendChild(h4);
    a.appendChild(button);
    divFooter.appendChild(a);
    divCard.appendChild(img);
    divCard.appendChild(divBody);
    divCard.appendChild(divFooter);
    divCard.appendChild(spanHidden);
    li.appendChild(divCard);

    return li;
}

export function createMovieCard(movie,likes,ownLike) {
    const template = `<h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${movie.img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>${movie.description}</p>
        ${createControls(movie,likes,ownLike)}
    </div>`

    const descriptionElement = document.querySelector('div[data-id="description"]');
    descriptionElement.replaceChildren();
    descriptionElement.innerHTML = template;
    

    const deleteBtn = descriptionElement.querySelector('#delete-button');
    const editBtn = descriptionElement.querySelector('#edit-button');
    const likeBtn = descriptionElement.querySelector('a[data-id="like-function"]');

    if(deleteBtn) {
        deleteBtn.addEventListener('click', (e) => deleteMovie(e,movie));
        editBtn.addEventListener('click', (e) => showEditMovie(e,movie));
    } else if(likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e,movie));
    }

    return template;
}

function createControls(movie,likes,ownLike) {
    let isOwner = sessionStorage.email && sessionStorage.id == movie._ownerId;
    const token = sessionStorage.getItem('accessToken');
    let controls = [];

    if (token && isOwner) {
        controls.push(`<a id="delete-button" class="btn btn-danger" href="#">Delete</a>`);
        controls.push(`<a id="edit-button" class="btn btn-warning" href="#">Edit</a>`);
        controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);
    } else if (token){
        if(ownLike) {
            controls.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
            controls.push(`<a style="display: none;" data-id="like-function" class="btn btn-primary" href="#">Like</a>`);
        } else {
            controls.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
            controls.push(`<a style="display: inline-block;" data-id="like-function" class="btn btn-primary" href="#">Like</a>`);
        }
    } else {
        controls.push(`<span style="display: inline-block;" data-id="likes-count" class="enrolled-span">Liked ${likes}</span>`);
    }

    return controls.join('');
}


function likeMovie(e,movie) {
    e.preventDefault();
    const body = { movieId: `${movie._id}` };
    const token = sessionStorage.getItem("accessToken");

    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": `${token}`
            },
        body: JSON.stringify(body)
    }

    fetch('http://localhost:3030/data/likes',options)
    .then(res => res.json())
    .then(data =>{
        const likedCount = document.querySelector('div[data-id="description"] span');
        const likeBtn = document.querySelector('a[data-id="like-function"]');
        const likes = Number(likedCount.textContent.match(/[0-9*]/gm)[0]);
        likeBtn.style.display = 'none';
        likedCount.style.display = 'inline-block';
        likedCount.textContent = `Liked ${likes + 1}`;
    }).catch(err => {
        alert(err);
    })
}

export async function getLikes(id) {
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

export async function getOwnLike(movieId,userId) {
    if(!userId) {
        return false;
    } else {
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }

}

function editMovie(e, movie) {
    e.preventDefault();
    const data = new FormData(editForm);
    const title = data.get('title');
    const description = data.get('description');
    const img = data.get('img');

    const body = {
        title: title,
        description: description,
        img: img
    }
    const token = sessionStorage.getItem("accessToken");
    
    const options = {
        method: "PUT",
        headers: {
        'Content-type': 'application/json',
        "X-Authorization": `${token}`
    },
        body: JSON.stringify(body)
    }

    fetch(`http://localhost:3030/data/movies/${movie._id}`,options)
    .then(res => res.json())
    .then(() => {
        routes.showHome();
        displayMovies();
    }).catch(err => {
        alert(err);
    })

}

function deleteMovie(e,movie) {
    e.preventDefault();

    const token = sessionStorage.getItem("accessToken");

    const options = {
        method: "DELETE",
        headers: {"X-Authorization": `${token}`}
    }

    fetch(`http://localhost:3030/data/movies/${movie._id}`,options)
    .then(res => res.json())
    .then(()=> {
        routes.showHome();
        displayMovies();
    })
    .catch(err => {
        alert(err);
    })
}

function showEditMovie(e,movie) {
    e.preventDefault()
    routes.showEdit();
    const titleElement = document.querySelector('input[data-id="edit-title"]');
    const descriptionElement = document.querySelector('textarea[data-id="edit-description"]');
    const imgElement = document.querySelector('input[data-id="edit-img"]');

    editForm.addEventListener('submit', (e)=> editMovie(e,movie));

    titleElement.value = movie.title;
    descriptionElement.value = movie.description;
    imgElement.value = movie.img;

    console.log(movie);
}