function getCity(name, population, treasury) {
    
    let city = {};

    city.name = name;
    city.population = population;
    city.treasury = treasury;

    return city;
}

getCity('Tortuga', 7000, 15000);
getCity('Santo Domingo', 12000, 23500);