function addItem() {
    let input = document.getElementById('newItemText');

    let newElement = document.createElement('li');
    newElement.textContent = input.value;

    let items = document.getElementById('items');
    items.appendChild(newElement);

    input.value = '';

}