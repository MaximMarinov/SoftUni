function solve(input) {
    const first = Number(input.shift());
    const last = Number(input.pop());
    return first + last;
};

solve(['20', '30', '40']);
solve(['5', '10']);