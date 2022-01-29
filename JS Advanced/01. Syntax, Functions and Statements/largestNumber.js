function getLargestNum(a, b, c){
    if (a > b && a > c) {
        console.log(`The largest number is ${a}.`);
    } else if (b > a && b > c) {
        console.log(`The largest number is ${b}.`);
    } else if (c > a && c > b) {
        console.log(`The largest number is ${c}.`);
    }
}

getLargestNum(5, -3, 16);
getLargestNum(-3, -5, -22.5);