function solve(){

   const author = document.getElementById('creator');
   const title = document.getElementById('title');
   const category = document.getElementById('category');
   const content = document.getElementById('content');

   const ol = document.querySelector('ol');
   const postsSection = document.querySelector('main section');

   const createBtn = document.querySelector('button.btn.create');

   createBtn.addEventListener('click', (e) => {
       e.preventDefault();

       const input = {
           author: author.value.trim(),
           title: title.value.trim(),
           category: category.value.trim(),
           content: content.value.trim()
       };

       const article = document.createElement('article');

       article.innerHTML = `<h1>${input.title}</h1>
                           <p>Category:
                           <strong>${input.category}</strong>
                           </p>
                           <p>Creator:
                           <strong>${input.author}</strong>
                           </p>
                           <p>${input.content}</p>
                           <div class="buttons">
                           <button class="btn delete">Delete</button>
                           <button class="btn archive">Archive</button>
                           </div>`;

       postsSection.appendChild(article);

       author.value = '';
       title.value = '';
       category.value = '';
       content.value = '';

       article.addEventListener('click', (e) => {
           if (e.target.tagName == 'BUTTON' && e.target.className == 'btn archive') {
               article.remove();
               const liElement = document.createElement('li');
               liElement.textContent = `${input.title}`;
               ol.appendChild(liElement);

               Array.from(ol.children)
               .sort((a,b) =>  a.textContent.localeCompare(b.textContent))
               .forEach(element => ol.appendChild(element));
           }

           if (e.target.tagName == 'BUTTON' && e.target.className == 'btn delete') {
               article.remove();
           }
       });
   });
}
