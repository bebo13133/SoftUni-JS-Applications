function attachEvents() {
    const [location, submitBtn, foreCast, currentWeather, upcomingWeather] =
        ["#location", "#submit", "#forecast", '#current', '#upcoming'].map(selector => document.querySelector(selector))
    const urlLocation = `http://localhost:3030/jsonstore/forecaster/locations`

    submitBtn.addEventListener('click', onLoad)
    const symbols = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176',
    }
    function onLoad() {
        fetch(urlLocation)
            .then(response => { return response.json() })
            .then(data => {   
                let findLocation = data.find(x => x.name === location.value)
                if (findLocation == undefined) throw new Error()
                foreCast.style.display = 'block'

                let code = findLocation.code
                const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`
                const threeDaysUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
                fetch(urlToday)
                    .then(response => response.json())
                    .then(dataToday => {
                        const forestDiv = createElement('div', '', 'forecasts')
                        let spnSymbol = createElement('span', '', ('condition', 'symbol'), symbols[dataToday.forecast.condition]);
                        const conditionSpan = createElement('span', '', 'condition');
                        const span1 = createElement('span', dataToday.name, 'forecast-data');
                        const span2 = createElement('span', '', 'forecast-data',`${dataToday.forecast.low}&#176;/${dataToday.forecast.high}&#176;`)
                        const span3 = createElement('span', dataToday.forecast.condition, 'forecast-data');
                        append(conditionSpan, span1, span2, span3);
                        append(forestDiv, spnSymbol, conditionSpan);
                        append(currentWeather, forestDiv);

                        fetch(threeDaysUrl)
                        .then(response => response.json())
                        .then(dataLine=>{
                           
                            const divInfo = createElement('div','','forecast-info')
                            dataLine.forecast.forEach(el=>{
                         
                            const upComingSpan = createElement('span', '','upcoming')
                            let spanSymbol = createElement('span', '',  'symbol', symbols[el.condition])
                            let span1 = createElement('span','','forecast-data',`${el.low}&#176;/${el.high}&#176;`)
                            let span2 = createElement('span', el.condition, 'forecast-data');

                     
                            append(upComingSpan,spanSymbol,span1,span2)
                            append(divInfo,upComingSpan)
                            return divInfo
                            });
                            append(upcomingWeather, divInfo)
                        })
                    })
            })
    }
    function createElement(type, content, className, weatherSymbol) {
        let element = document.createElement(type);
        content ? element.textContent = content : '';
        className ? element.classList.add(className) : '';
        // idName ? element.id = idName : '';
        if (weatherSymbol) {
            element.innerHTML = weatherSymbol;
        }
        return element;
    }
    function append(parent, ...elements) {
        elements.map((el) => parent.appendChild(el));
    }
}

attachEvents();