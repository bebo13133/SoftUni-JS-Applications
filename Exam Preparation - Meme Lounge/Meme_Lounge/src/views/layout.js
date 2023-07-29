import { html } from '../../node_modules/lit-html/lit-html.js';

//TODO replace to actual layout
export const layoutTemplate = (userData, content) => html`
    <nav>
            <a href="/catalog">All Memes</a>
             <!-- Logged users -->
             ${userData ? html`<div class="user">
                <a href="/create">Create Meme</a>
                <div class="profile">
                    <span>Welcome, ${userData.email}</span>
                    <a href="/profile">My Profile</a>
                    <a href="/logout">Logout</a>
                </div>
            </div>`:html`<div class="guest">
                <div class="profile">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
                <a class="active" href="/">Home Page</a>
            </div>`}
  
           
        </nav>
      <main>
        ${content}
      </main>`