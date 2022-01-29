function solve(a, b, operator) {
    switch (operator) {
        case '+':
            console.log(a + b);
            break;

        case '-':
            console.log(a - b);
            break;

        case '*':
            console.log(a * b);
            break;

        case '/':
            console.log(a / b);
            break;

        case '%':
            console.log(a % b);
            break;
            
        case '**':
            console.log(a ** b);
            break;
        default:
            break;
    }
}

solve(5, 6, '+');
solve(3, 5.5, '*');