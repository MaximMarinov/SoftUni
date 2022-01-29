function attachEvents() {
    let getWeatherBtn = document.querySelector('input#submit.bl')
        .addEventListener('click', displayWeather);
}

async function displayWeather() {
    let currentWeatherContainer = document.getElementById('current');
    let upcoming = document.getElementById('upcoming');
    let forecastSection = document.getElementById('forecast');
    try {
        let selectedLocation = await getLocation();
        forecastSection.style.display = 'block';

        let location = Object.values(selectedLocation).find(l => l.code);

        if (location == false) {
            currentWeatherContainer.textContent = 'Error';
            upcoming.textContent = 'Error';
        }
        locationCurrentWeather(location.code);
        location3DayForecast(location.code);

    } catch (error) {
        currentWeatherContainer.textContent = 'Error';
        upcoming.textContent = 'Error';
    }
}

async function getLocation() {
    try {
        let inputWeather = document.querySelector('input#location.bl').value;

        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const response = await fetch(url);
        const data = await response.json();
        //forecastSection.style.display = 'block';
        return Object.values(data).filter(w => w.name == inputWeather);

    } catch (error) {
        alert('Error');
    }
}

async function locationCurrentWeather(locationCode) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + locationCode;
    const response = await fetch(url);
    const data = await response.json();

    let forecastsContainer = document.createElement('div');
    forecastsContainer.classList.add('forecasts');

    let currentWeatherContainer = document.getElementById('current');
    currentWeatherContainer.replaceChildren();

    let currLabel = document.createElement('div');
    currLabel.classList.add('label');
    currLabel.textContent = 'Current conditions';

    currentWeatherContainer.appendChild(currLabel);
    currentWeatherContainer.appendChild(forecastsContainer);

    let currentSymbol = document.createElement('span');
    currentSymbol.classList.add('symbol');
    forecastsContainer.appendChild(currentSymbol);

    let currentCondition = document.createElement('span');
    currentCondition.classList.add('condition');
    forecastsContainer.appendChild(currentCondition);

    const currentLocation = Object.values(data).find(w => w.condition);

    if (currentLocation.condition == 'Sunny') {
        currentSymbol.textContent = '☀';
    } else if (currentLocation.condition == 'Partly sunny') {
        currentSymbol.textContent = '⛅';
    } else if (currentLocation.condition == 'Overcast') {
        currentSymbol.textContent = '☁';
    } else if (currentLocation.condition == 'Rain') {
        currentSymbol.textContent = '☂';
    }

    let locationName = document.createElement('span');
    locationName.classList.add('forecast-data');
    locationName.textContent = data.name;
    currentCondition.appendChild(locationName);

    let locationTemperatures = document.createElement('span');
    locationTemperatures.classList.add('forecast-data');
    locationTemperatures.textContent = `${currentLocation.low}°/${currentLocation.high}°`;
    currentCondition.appendChild(locationTemperatures);

    let locationCondition = document.createElement('span');
    locationCondition.classList.add('forecast-data');
    locationCondition.textContent = currentLocation.condition;
    currentCondition.appendChild(locationCondition);
}

async function location3DayForecast(locationCode) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + locationCode;
    const response = await fetch(url);
    const data = await response.json();

    let forecast = data.forecast;

    let upcoming = document.getElementById('upcoming');
    upcoming.replaceChildren();

    let forecastInfo = document.createElement('div');
    forecastInfo.classList.add('forecast-info');

    let currLabel = document.createElement('div');
    currLabel.classList.add('label');
    currLabel.textContent = 'Three-day forecast';

    upcoming.appendChild(currLabel);
    upcoming.appendChild(forecastInfo);

    for (const f of forecast) {
        let upcomingSpan = document.createElement('span');
        upcomingSpan.classList.add('upcoming');
        forecastInfo.appendChild(upcomingSpan);
        
        let currentSymbol = document.createElement('span');
        currentSymbol.classList.add('symbol');
        upcomingSpan.appendChild(currentSymbol);

        if (f.condition == 'Sunny') {
            currentSymbol.textContent = '☀';
        } else if (f.condition == 'Partly sunny') {
            currentSymbol.textContent = '⛅';
        } else if (f.condition == 'Overcast') {
            currentSymbol.textContent = '☁';
        } else if (f.condition == 'Rain') {
            currentSymbol.textContent = '☂';
        }

        let locationTemperatures = document.createElement('span');
        locationTemperatures.classList.add('forecast-data');
        locationTemperatures.textContent = `${f.low}°/${f.high}°`;
        upcomingSpan.appendChild(locationTemperatures);

        let locationCondition = document.createElement('span');
        locationCondition.classList.add('forecast-data');
        locationCondition.textContent = f.condition;
        upcomingSpan.appendChild(locationCondition);
    }
}

attachEvents();