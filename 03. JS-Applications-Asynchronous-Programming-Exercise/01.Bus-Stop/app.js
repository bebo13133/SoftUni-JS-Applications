function getInfo(e) {

    const [stopId, submit, result, buses, stopName] = ['#stopId', "#submit", "#result", '#buses', '#stopName']
        .map(selector => document.querySelector(selector));
    const url = 'http://localhost:3030/jsonstore/bus/businfo'


    buses.innerHTML = "";
    stopName.innerHTML = "loading..."
    fetch(`${url}/${stopId.value}`)
        .then(response => {
            if (response.status !== 200 || submit.value == "") {
                throw new Error();
            }

            return response.json()
        })
        .then((data) => {

            Object.entries(data.buses).forEach((e) => {
                let li = document.createElement('li')
                li.textContent = `Bus ${e[0]} arrives in ${e[1]} minutes`
                buses.appendChild(li)

            });
            stopName.textContent = data.name
        })
        .catch((err) => {
            stopName.textContent = `${err}`
        })


}