async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    let stopNameContainer = document.getElementById('stopName');
    let busesList = document.getElementById('buses');

    try {
        busesList.replaceChildren();
        stopNameContainer.textContent = 'Loading...';
        const response = await fetch(url);

        if(response.status != 200) {
            throw new Error('Invalid Bus Stop');
        }

        const data = await response.json();
        stopNameContainer.textContent = data.name;

        let busesInfo = Object.entries(data.buses).map(b => `Bus ${b[0]} arrives in ${b[1]} minutes`);
        
        for (const bus of busesInfo) {
            let liElement = document.createElement('li');
            liElement.textContent = bus;
            busesList.appendChild(liElement);
        }

    } catch (error) {
        stopNameContainer.textContent = 'Error';
    }
    
}