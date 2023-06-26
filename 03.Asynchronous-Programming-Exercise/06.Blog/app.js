async function attachEvents() {
    let selectMenu = document.getElementById('posts');
    let postBody = ''
    document.getElementById('btnLoadPosts').addEventListener('click', async () => {
        let posts = await fetch('http://localhost:3030/jsonstore/blog/posts');
        let postsData = await posts.json();
        selectMenu.innerHTML = "";
        for (let post of Object.values(postsData)) {
            selectMenu.add(new Option(post.title, post.id));
            postBody= post.body
        }
    });
    document.getElementById('btnViewPost').addEventListener('click', async () => {
        let selectMenu = document.getElementById('posts');
        let postComments = document.getElementById('post-comments');
        let postTitle = document.getElementById('post-title');
        let commentPara = document.getElementById('post-body');
        postComments.innerHTML = "";
        let [body,comments] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/blog/posts/` +selectMenu.value),
            fetch('http://localhost:3030/jsonstore/blog/comments'), 
        ]);
      let [bodyText,commentsData] = await Promise.all([body.json(),comments.json()]);
      postTitle.textContent = selectMenu.options[selectMenu.selectedIndex].text;
      commentPara.textContent = postBody;
       
         const comm = Object.values(commentsData).filter(c => c.postId == selectMenu.value)
        .forEach(x=>{
            let li = document.createElement('li');
            li.id = x.postId;
            li.textContent = x.text;
            postComments.appendChild(li); 
        })
    });
 }

attachEvents();




// Вариант 2 
function attachEvents() {
    const [postBtn, posts, viewBtn, comments] = ['#btnLoadPosts', '#posts', "#btnViewPost", '#post-comments']
        .map(sel => document.querySelector(sel))
    postBtn.addEventListener('click', onPost)
    viewBtn.addEventListener('click', onView)
    let postbody = '';
    async function onPost(e) {
        const response = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
        const data = await response.json();
        posts.innerHTML = "";
        Object.entries(data).forEach(([key, value]) => {
            let optionElement = document.createElement('option');
            optionElement.value = key
            optionElement.textContent = value.title
            posts.appendChild(optionElement)
            postbody = value.body
        })
    }
    async function onView(e) {
        let select = [...posts.children].find((x) => x.selected == true)
        const [res, comment] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/blog/posts/${select.value}`),
            fetch(`http://localhost:3030/jsonstore/blog/comments`)
        ]);
        const data = await res.json();
        comments.innerHTML = "";
        document.getElementById('post-title').textContent = posts.options[posts.selectedIndex].text
        document.getElementById('post-body').textContent = postbody
        const dataComments = await comment.json();
 
        Object.values(dataComments).forEach((el) => {
            if (data.id == el.postId) {
                let li = document.createElement('li')
                li.textContent = el.text
                li.id = el.id
                comments.appendChild(li);
            }
        });
    }
}
attachEvents();