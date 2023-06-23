function solve() {
    const [info, departBtn, arriveBtn] = ["#info span", "#depart", '#arrive']
        .map(selector => document.querySelector(selector));

    let stations = {
        next: 'depot'
    }
    async function depart() {
        departBtn.disabled = true;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stations.next}`
        const response = await fetch(url)
        if (response.status !== 200) {
            departBtn.disabled = true
            arriveBtn.disabled = true
            throw new Error("Error")

        }
        stations = await response.json()
        info.textContent = `Next stop ${stations.name}`

        arriveBtn.disabled = false
    }

    function arrive() {
        departBtn.disabled = false
        info.textContent = `Arriving at ${stations.name}`
        arriveBtn.disabled = true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();