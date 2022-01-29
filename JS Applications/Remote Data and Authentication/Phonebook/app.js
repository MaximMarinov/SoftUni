function attachEvents() {
    document.getElementById('btnLoad')
        .addEventListener('click', loadContacts);
    
    document.getElementById('btnCreate')
        .addEventListener('click', onCreate);

    document.getElementById('phonebook')
        .addEventListener('click', onDelete);
}

attachEvents();

let phonebook = document.getElementById('phonebook');
let personInput = document.getElementById('person');
let phoneInput = document.getElementById('phone');

async function onDelete(e) {
    const id = e.target.dataset.id;
    if(id != undefined) {
        await deleteContact(id);
        e.target.parentElement.remove();
    }
}

async function onCreate() {
    const person = personInput.value;
    const phone = phoneInput.value;
    await createContact({person, phone});

    phonebook.appendChild(createItem({person, phone}));
}

async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const data = await response.json();

    phonebook.replaceChildren(...Object.values(data).map(createItem));
}

function createItem(c) {
    let liElement = document.createElement('li');
    liElement.innerHTML = `${c.person}: ${c.phone} <button data-id="${c._id}">Delete</button>`;
    return liElement;
}

async function createContact(contact) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    };
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
}

async function deleteContact(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;
    const options = {
        method: 'delete'
    };
    const response = await fetch(url, options);
    const result = response.json();

    return result;
}