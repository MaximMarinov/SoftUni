function colorize() {
    // TODO
    let rows = document.querySelectorAll('table tr');
    
    let index = 0;
    for (const row of Array.from(rows)) {
        index++;

        if (index % 2 == 0) {
            row.style.background = 'teal';
        }
    }
}