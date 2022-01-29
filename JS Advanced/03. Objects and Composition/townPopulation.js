function getTowns(input) {
    let result = {};

    for (const item of input) {
        let tokens = item.split(' <-> ');

        let name = tokens[0];
        let population = Number(tokens[1]);

        if (result[name] == undefined) {
            result[name] = population;
        } else {
            result[name] += population;
        }

    }

    for (const key in result) {
        console.log(`${key} : ${result[key]}`);
    }
}

getTowns(['Sofia <-> 1200000',
'Montana <-> 20000',
'New York <-> 10000000',
'Washington <-> 2345000',
'Las Vegas <-> 1000000']);

getTowns(['Istanbul <-> 100000',
'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000']);