function extractText() {
    // TODO
    let elements = document.getElementById('items').children;
    let result = [];

    for (const item of Array.from(elements)) {
        result.push(item.textContent);
    }
    
    document.getElementById('result').textContent = result.join('\n');
}