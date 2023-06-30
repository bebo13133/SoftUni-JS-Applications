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




// // Вариант 2 

// function attachEvents() {
//     const [postBtn, posts, viewBtn, comments] = ['#btnLoadPosts', '#posts', "#btnViewPost", '#post-comments']
//         .map(sel => document.querySelector(sel))
//     postBtn.addEventListener('click', onPost)
//     viewBtn.addEventListener('click', onView)
//     let postBody = '';
//     async function onPost(e) {
//         const response = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
//         const data = await response.json();
//         posts.innerHTML = "";
//         Object.entries(data).forEach(([key, value]) => {
//             let optionElement = document.createElement('option');
//             optionElement.value = key
//             optionElement.textContent = value.title
//             posts.appendChild(optionElement)
//             postBody = value.body
//         })
//     }
//     async function onView(e) {
//         let select = [...posts.children].find((x) => x.selected == true)
//         const [res, comment] = await Promise.all([
//             fetch(`http://localhost:3030/jsonstore/blog/posts/${select.value}`),
//             fetch(`http://localhost:3030/jsonstore/blog/comments`)
//         ]);
//         const data = await res.json();
//         comments.innerHTML = "";
//         document.getElementById('post-title').textContent = posts.options[posts.selectedIndex].text
//         document.getElementById('post-body').textContent = postBody
//         const dataComments = await comment.json();
 
//         Object.values(dataComments).forEach((el) => {
//             if (data.id == el.postId) {
//                 let li = document.createElement('li')
//                 li.textContent = el.text
//                 li.id = el.id
//                 comments.appendChild(li);
//             }
//         });
//     }
// }
// attachEvents();

// Вариант 3 
// function attachEvents() {
//     const optionSelect = document.getElementById("posts");
//     const loadBtn = document.getElementById("btnLoadPosts");
//     const viewBtn = document.getElementById("btnViewPost");
//     const postComments = document.getElementById("post-comments");
   
//     loadBtn.addEventListener("click", loadPosts);
//     viewBtn.addEventListener("click", viewPost);
//      let postBody = ''
//     async function loadPosts() {
//       const url = `http://localhost:3030/jsonstore/blog/posts`;
//       const response = await fetch(url);
//       const data = await response.json();
    
//       Object.entries(data).forEach(([key, value]) => {
//         const option = document.createElement("option");
//         option.value = key;
//         option.textContent = value.title;
//         optionSelect.appendChild(option);
//         postBody = value.body
//       });
//     }
   
//     async function viewPost() {
//       const url = `http://localhost:3030/jsonstore/blog/comments`;
//       const response = await fetch(url);
//       const data = await response.json();
//       const comments = Object.values(data).filter(
//         (el) => el.postId === optionSelect.value
//       );
 
   
//       document.getElementById(`post-title`).textContent =
//       optionSelect.options[optionSelect.selectedIndex].text;
//       document.getElementById('post-body').textContent = postBody
//     //   const postsUrl = `http://localhost:3030/jsonstore/blog/posts`;
//     //   const postsResponse = await fetch(postsUrl);
//     //   const postsData = await postsResponse.json();
//       postComments.replaceChildren();
//       comments.forEach((el) => {
//         const li = document.createElement("li");
//         li.id = el.id;
//         li.textContent = el.text;
//         postComments.appendChild(li);
//       });
//     }
//   }
//   attachEvents();


//Вариант 4
// function attachEvents() {
//     const loadBtn = document.getElementById('btnLoadPosts');
//     const viewBtn = document.getElementById('btnViewPost');
//     loadBtn.addEventListener('click', loadBtnClick);
//     viewBtn.addEventListener('click', viewBtnClick);
//     const posts = document.getElementById('posts')
//     const postsComments = document.getElementById("post-comments");
//     const postBody =""
//     async function loadBtnClick(e) {
//         const response = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
//         const data = await response.json();
//         posts.innerHTML = '';
//         Object.entries(data).forEach(element => {
//             const option = document.createElement('option');
//             option.value = element[0];
//             option.textContent = element[1].title;
//             posts.appendChild(option);
//             postBody=element[1].body
//         })
//     }
 
//     async function viewBtnClick(e) {
//         const response = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
//         const data = await response.json();
//         // const responsePosts = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
//         // const dataPosts = await responsePosts.json();
 
//         let postId = posts.value;
//         let matchingComments = Object.values(data).filter(el => el.postId === postId);
//         // let searchedPost = dataPosts[postId]
 
//         const h1 = document.getElementById('post-title');
//         h1.textContent = searchedPost.title;
//         const p = document.getElementById('post-body');
//         p.textContent = postBody
 
//         postsComments.innerHTML = '';
//         matchingComments.forEach(el => {
//             const li = document.createElement('li');
//             li.textContent = el.text;
//             li.id = el.id;
//             postsComments.appendChild(li);
//         })
//     }
// }
// attachEvents();