function attachEvents() {
    const optionSelect = document.getElementById("posts");
    const loadBtn = document.getElementById("btnLoadPosts");
    const viewBtn = document.getElementById("btnViewPost");
    const postComments = document.getElementById("post-comments");
   
    loadBtn.addEventListener("click", loadPosts);
    viewBtn.addEventListener("click", viewPost);
   
    async function loadPosts() {
      const url = `http://localhost:3030/jsonstore/blog/posts`;
      const response = await fetch(url);
      const data = await response.json();
      let postBody = ''
      Object.entries(data).forEach(([key, value]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = value.title;
        optionSelect.appendChild(option);
        postBody= option.body
      });
    }
   
    async function viewPost() {
      const url = `http://localhost:3030/jsonstore/blog/comments`;
      const response = await fetch(url);
      const data = await response.json();
      const comments = Object.values(data).filter(
        (el) => el.postId === optionSelect.value
      );
      const postsUrl = `http://localhost:3030/jsonstore/blog/posts`;
      const postsResponse = await fetch(postsUrl);
      const postsData = await postsResponse.json();
      document.getElementById(`post-title`).textContent =
        postsData[optionSelect.value].title;
      document.getElementById(`post-body`).textContent = postBody
      postComments.replaceChildren();
      comments.forEach((el) => {
        const li = document.createElement("li");
        li.id = el.id;
        li.textContent = el.text;
        postComments.appendChild(li);
      });
    }
  }