function solve() {
    const [info, departBtn, arriveBtn] = ["#info span", "#depart",'#arrive']
    .map(selector=>document.querySelector(selector));

    let stop = {
        next:'depot'
    }

    async function depart() {
        departBtn.disabled = true;



        const url =`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`
        const response = await fetch(url)
        if(response.status !== 200){
            departBtn.disabled  =true
            arriveBtn.disabled = true
            throw new Error("Error")

        }
   stop = await response.json()


    info.textContent =`Next stop ${stop.name}`

arriveBtn.disabled = false 
}

    function arrive() {
   departBtn.disabled = false
   info.textContent = `Arriving at ${stop.name}`
   arriveBtn.disabled=true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();