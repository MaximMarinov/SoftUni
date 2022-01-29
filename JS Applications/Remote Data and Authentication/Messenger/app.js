function attachEvents() {
    document.getElementById('refresh')
        .addEventListener('click', getMessages);

    document.getElementById('submit')
        .addEventListener('click', onSend);
    getMessages();
}

let textarea = document.getElementById('messages');
let authorInput = document.querySelector('[name="author"]');
let contentInput = document.querySelector('[name="content"]');

attachEvents();

async function onSend() {
    const author = authorInput.value;
    const content = contentInput.value;

    const result = await createMessage({author, content});

    contentInput.value = '';
    textarea.value += '\n' + `${author}: ${content}`;
}

async function getMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();

    let messages = Object.values(data);

    textarea.value = messages
        .map(m => `${m.author}: ${m.content}`)
        .join('\n');
}

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };

    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}