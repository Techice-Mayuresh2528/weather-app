// =========================
// Weather App
// =========================

const apiKey = "d0b09bb8b9f8bc9c1ad00503a775f7e9";

// Current Weather API
const currentWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather";

// 5-Day Forecast API
const forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast";

// Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

const weatherIcon = document.getElementById("weatherIcon");

const forecastContainer =
    document.getElementById("forecastContainer");

// Search Button
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city===""){
        alert("Please enter a city.");
        return;
    }

    getWeather(city);
    getForecast(city);

});

// Enter Key
cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});

// --------------------
// Current Weather
// --------------------

async function getWeather(city){

    const response =
    await fetch(`${currentWeatherURL}?q=${city}&appid=${apiKey}&units=metric`);

    const data = await response.json();

    if(data.cod!=200){

        alert("City not found");

        return;

    }

    cityName.textContent=data.name;

    temperature.textContent=
    `${Math.round(data.main.temp)}°C`;

    description.textContent=
    data.weather[0].description;

    humidity.textContent=
    `${data.main.humidity}%`;

    wind.textContent=
    `${data.wind.speed} km/h`;

    feelsLike.textContent=
    `${Math.round(data.main.feels_like)}°C`;

    pressure.textContent=
    `${data.main.pressure} hPa`;

    weatherIcon.src=
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    sunrise.textContent=
    new Date(data.sys.sunrise*1000)
    .toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit'
    });

    sunset.textContent=
    new Date(data.sys.sunset*1000)
    .toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit'
    });

}

// --------------------
// 5 Day Forecast
// --------------------

async function getForecast(city){

    const response =
    await fetch(`${forecastURL}?q=${city}&appid=${apiKey}&units=metric`);

    const data =
    await response.json();

    forecastContainer.innerHTML="";

    const forecastMap={};

    data.list.forEach(item=>{

        const date=item.dt_txt.split(" ")[0];

        if(!forecastMap[date]){

            forecastMap[date]=item;

        }

    });

    Object.values(forecastMap)
    .slice(0,5)
    .forEach(day=>{

        const forecastDate=
        new Date(day.dt_txt);

        const dayName=
        forecastDate.toLocaleDateString("en-US",{
            weekday:"short"
        });

        forecastContainer.innerHTML+=`

        <div class="forecast-card">

            <h4>${dayName}</h4>

            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

            <p>${Math.round(day.main.temp)}°C</p>

        </div>

        `;

    });

}
// =========================
// Dark Mode
// =========================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});