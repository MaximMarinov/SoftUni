function solve() {

    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    const label = document.querySelector('div#info span');
    let stop = {
        next: 'depot'
    };

    async function depart() {
        label.textContent = 'Loading...';

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);
        const data = await res.json();
        stop = data;

        label.textContent = `Next stop  ${stop.name}`;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    async function arrive() {

        label.textContent = `Arriving at ${stop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();