import { routes } from "./router.js";
import { login, signUp, logout } from "./authentication.js";
import { displayMovies, addMovie, createMovieCard, getMovies,getLikes, getOwnLike } from "./movies.js";

// Nav links
const links = Array.from(document.querySelectorAll('.nav-link'));
const welcomeLink = links[0];
const logoutLink = links[1];
const loginLink = links[2];
const registerLink = links[3];

const catalog = document.querySelector('#movies-list');
catalog.addEventListener('click', async (e) => {
    if (e.target.tagName == 'BUTTON') {
        const movieId = e.target.dataset.id;
        const userId = sessionStorage.getItem("id");
        const [movie,likes, ownLike] = await Promise.all([
            getMovies(movieId),
            getLikes(movieId),
            getOwnLike(movieId,userId)
        ])
        routes.showDescription();
        createMovieCard(movie,likes,ownLike);
    }
});

const addMovieBtn = document.getElementsByClassName('btn btn-warning')[0];
addMovieBtn.style.display = 'none';

onLoad();

function onLoad() {
    routes.showHome();
    displayMovies();
    
    const token = sessionStorage.getItem("accessToken");
    const email = sessionStorage.getItem("email");
    
    if(!token) {
        welcomeLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
        
    if(token) {
        // TO DO
        registerLink.style.display = 'none';
        loginLink.style.display = 'none';
        addMovieBtn.style.display = 'inline-block';
        welcomeLink.textContent = `Welcome, ${email}`;

        // ADD Movie
        addMovieBtn.addEventListener('click', (e)=> {
            e.preventDefault();
            routes.showAddMovie();
            addMovie();
        });
    }
}


// LOGOUT

logoutLink.addEventListener('click',()=> {
    routes.showHome();

    const token = sessionStorage.getItem("accessToken");

    logout(token);

});


// LOGIN

loginLink.addEventListener('click',()=> {
    routes.showLogin();
    const loginForm = document.querySelector('#login-form');
    
    loginForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        const data = new FormData(loginForm);
        const email = data.get('email');
        const password = data.get('password');

        login(email,password);
    })
});


// REGISTER

registerLink.addEventListener('click',()=> {
    routes.showRegister()
    const registerForm = document.querySelector('#register-form');

    registerForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const data = new FormData(registerForm);
        const email = data.get('email');
        const password = data.get('password');
        const rePassword = data.get("repeatPassword");
        
        // Input Validation
        if (email == '' || password.length < 6 || password != rePassword) {
            alert('Incorect email or password!');
            return;
        }
        
        signUp(email,password);
    })
});
