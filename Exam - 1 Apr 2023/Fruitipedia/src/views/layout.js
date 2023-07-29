import { html } from '../../node_modules/lit-html/lit-html.js';

//TODO replace to actual layout
export const layoutTemplate = (userData, content) => html`
    <header>
        <!-- Navigation -->
        <a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/catalog">Fruits</a>
            <a href="/search">Search</a>
          </div>

          <!-- Logged-in users -->
          ${userData ? html`<div class="user">
            <a href="/create">Add Fruit</a>
            <a href="/logout">Logout</a>
          </div>`: html`  <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          
          </div>`}
      
        </nav>
      </header>
      <main>
        ${content}
      </main>`