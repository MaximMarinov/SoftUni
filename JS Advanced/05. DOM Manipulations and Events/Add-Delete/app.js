function addItem() {
    //TODO...
    let input = document.getElementById('newItemText');

    let newElement = document.createElement('li');
    newElement.textContent = input.value;

    let items = document.getElementById('items');
    items.appendChild(newElement);

    let removeBtn = document.createElement('a');
    removeBtn.textContent = '[Delete]';
    removeBtn.href = '#';
    newElement.appendChild(removeBtn);

    input.value = '';
    
    removeBtn.addEventListener('click', onClick);

    function onClick(ev) {
        newElement.remove();
    }
}