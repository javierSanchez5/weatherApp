let city = document.querySelector('.city');
let date = document.querySelector('.date');
let high = document.querySelector('.high__span');
let low = document.querySelector('.low__span');
let currentDegree = document.querySelector('.degree__span');
let wind = document.querySelector('.wind__span');
let pressure = document.querySelector('.pressure__span');
let humidity = document.querySelector('.humidity__span');
let summary = document.querySelector('.summary');
let days = document.querySelector('.days');


function WeatherInfo(e) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=18690ba5428e1e41b09c9936948964e3`;

        
        currentWeather(api);
        forecast(lat,long);

    });
    // 18690ba5428e1e41b09c9936948964e3
}

function currentWeather(api) {
    fetch(api)
            .then(response => response.json())
            .then(data => {
                city.textContent =`${data.name},  ${data.sys.country}`  ;
                date.textContent = new Date("Mar 25 2015");//crear funcion
                currentDegree.textContent = data.main.temp;
                high.textContent = data.main.temp_max;
                low.textContent = data.main.temp_min;
                wind.textContent = data.wind.speed;
                pressure.textContent = data.main.pressure;
                humidity.textContent = data.main.humidity;
                summary.textContent = data.weather[0].description;
                
            });
}

function forecast(lat,long) {
        let forApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=18690ba5428e1e41b09c9936948964e3`;

        fetch(forApi)
            .then(response => response.json())
            .then(data => {
                console.log(data.list);
                forecastDay(data);
            
            });

}

function forecastDay(data) {
    let html ="";
    for (let i = 0;i<data.list.length;i+=8){
        const date = data.list[i].dt_txt.split(" ")[0].slice(5);
        console.log(date);
        html += `<div class="day day1">
                    <p class="day__date">${date}</p>
                    <img src="icons/mostly-sunny.svg" alt="">
                    <p>${(data.list[i].main.temp) } &#8451</p>
                </div>` ;
        days.innerHTML = html;
    }
}

function forecastHour(data){
    //
    
}
    




window.addEventListener('load',WeatherInfo);
