function solution() {
    let section = document.getElementById('main');

    let addArticleBtn = document.querySelector('button.getArticleBtn');
    addArticleBtn.addEventListener('click', () => {
        getArticle();
        addArticleBtn.style.display = 'none';
        section.textContent = 'Loading...';
    });
}

async function getArticle() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const data = await response.json();

    let section = document.getElementById('main');
    section.textContent = '';

    for (const article of Object.values(data)) {
        let accordion = document.createElement('div');
        accordion.classList.add('accordion');

        let head = document.createElement('div');
        head.classList.add('head');

        let nameSpan = document.createElement('span');
        nameSpan.textContent = article.title;
        head.appendChild(nameSpan);

        let moreBtn = document.createElement('button');
        moreBtn.classList.add('button');
        moreBtn.id = article._id;
        moreBtn.textContent = 'More';
        head.appendChild(moreBtn);

        accordion.appendChild(head);
        section.appendChild(accordion);

        let currentArticle = await moreClicked(article._id);

        let extra = document.createElement('div');
        extra.classList.add('extra');

        let content = document.createElement('p');
        content.textContent = currentArticle[2];

        extra.appendChild(content);
        accordion.appendChild(extra);

        moreBtn.addEventListener('click', async () => {

            if (moreBtn.textContent == 'More') {
                extra.style.display = 'block';
                moreBtn.textContent = 'Less';

            } else if(moreBtn.textContent == 'Less') {
                extra.style.display = 'none';
                moreBtn.textContent = 'More';
            }
        });
    };
}

async function moreClicked(id) {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
    const response = await fetch(url);
    const data = await response.json();

    return Object.values(data);
}

solution();