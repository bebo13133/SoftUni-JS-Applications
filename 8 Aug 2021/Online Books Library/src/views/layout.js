import { html } from '../../node_modules/lit-html/lit-html.js';

//TODO replace to actual layout
export const layoutTemplate = (userData, content) => html`
  
  <header id="site-header">
            <!-- Navigation -->
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/catalog">Dashboard</a>
                    <!-- Guest users -->
                    <!--TODO: add my books -->
                    ${userData ? html`<div id="user">
                        <span>Welcome, ${userData.email}</span>
                        <a class="button" href="/myBooks">My Books</a>
                        <a class="button" href="/create">Add Book</a>
                        <a class="button" href="/logout">Logout</a>
                    </div>`: html` <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                    </div>`}
                   
                    <!-- Logged-in users -->
                  
                </section>
            </nav>
        </header>
        <!-- Main Content -->
        <main id="site-content">${content}</main>`