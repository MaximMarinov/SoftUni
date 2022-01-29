function solve(input) {
    let biggest = -99999999999;
    
    for (const arr of input) {
        for (let i = 0; i < arr.length; i++) {
            if (biggest < arr[i]) {
                biggest = arr[i];
            }
            
        }
    }

    console.log(biggest);
}

solve([[20, 50, 10],
    [8, 33, 145]]);

solve([[3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]]);

