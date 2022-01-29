function solve(input){
    let result = input
    .filter((v, i) => i % 2 == 1)
    .map(a => a * 2)
    .reverse();

    console.log(result);
}

solve([10, 15, 20, 25]);
solve([3, 0, 10, 4, 7, 3]);