function getEvenPositionElement(input) {
    const result = [];
    for (let i = 0; i < input.length; i+=2) {
        result.push(input[i]);
    }
    console.log(result.join(' '));
};

getEvenPositionElement(['20', '30', '40', '50', '60']);
getEvenPositionElement(['5', '10']);