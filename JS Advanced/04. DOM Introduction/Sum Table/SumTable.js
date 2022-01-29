function sumTable() {
    let rows = document.querySelectorAll('tbody tr td');

    let index = 0;
    let sum = 0;
    for (const row of Array.from(rows)) {
        index++;

        if (index % 2 == 0) {
            let cost = Number(row.textContent);
            sum += cost;
        }
    }

    let result = document.getElementById('sum');
    result.textContent = sum;
}