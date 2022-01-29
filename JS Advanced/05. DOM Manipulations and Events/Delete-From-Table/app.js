function deleteByEmail() {
    let rows = [...document.querySelectorAll('tbody tr')];
    let input = document.querySelector('input').value;
    let result = document.getElementById('result');
    let text = document.createElement('p');
    text.textContent = '';
    result.appendChild(text);

    for (const row of rows) {
        if (input == row.children[1].textContent) {
            row.remove();
            text.textContent = 'Deleted.';
        }
        else {
            text.textContent = 'Not found.';
        }
    }
}