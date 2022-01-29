function attachEvents() {
    let btnLoadPosts = document.getElementById('btnLoadPosts')
        .addEventListener('click', getAllPosts);

    let btnViewPost = document.getElementById('btnViewPost')
        .addEventListener('click', displayPost);
}

async function displayPost() {
    let postTittle = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');
    let postComments = document.getElementById('post-comments');

    postTittle.textContent = 'Loading...';
    postBody.textContent = '';
    postComments.replaceChildren();

    let selectedPostId = document.getElementById('posts').value;

    const [post, comments] = await Promise.all([
        getSinglePost(selectedPostId),
        getAllComments(selectedPostId)
    ]);

    postTittle.textContent = post.title;
    postBody.textContent = post.body;

    comments.forEach(c => {
        let liElement = document.createElement('li');
        liElement.textContent = c.text;
        liElement.id = c.id;
        
        postComments.appendChild(liElement);
    });
}

async function getAllPosts() {
    const url = 'http://localhost:3030/jsonstore/blog/posts';
    const response = await fetch(url);
    const data = await response.json();

    let postsOptions = document.getElementById('posts');
    postsOptions.replaceChildren();
    
    Object.values(data)
        .forEach(p => {
            let optionElement = document.createElement('option');
            optionElement.textContent = p.title;
            optionElement.value = p.id;

            postsOptions.appendChild(optionElement);
        });
}

async function getSinglePost(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function getAllComments(postId) {
    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const response = await fetch(url);
    const data = await response.json();

    let comments = Object.values(data);
    comments = comments.filter(c => c.postId == postId);

    return comments;
}

attachEvents();