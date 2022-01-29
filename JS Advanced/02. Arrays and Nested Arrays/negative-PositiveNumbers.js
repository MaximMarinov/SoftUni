function solve(input) {
    const result = [];

    for (const item of input) {
        if (item < 0) {
            result.unshift(item);
        }
        else {
            result.push(item);
        }
    }

    console.log(result.join('\n'));
}

solve([7, -2, 8, 9]);
solve([3, -2, 0, -1]);