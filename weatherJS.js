function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card-group">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="card" id = "cardForForecast">
        <div class="forecastDate"><h4><b>${formatDay(forecastDay.dt)}</b></h4></div>
        <div class="forecastTemp">
          <span class="maxTemp"><h4><b> ${Math.round(
            forecastDay.temp.max
          )}°</b></h4> </span>
          <span class="minTemp"><h4><b> ${Math.round(
            forecastDay.temp.min
          )}°</b></h4> </span>
        </div>
        <div class = "forecastIcon">
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="80px"
        />
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let apiKey = "8fa8d64086e29f081d52f48a507241e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response) {
    document.querySelector(".cityName").innerHTML = response.data.name;
    document.querySelector("#description").innerHTML =response.data.weather[0].main;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#feelLike").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    celsiumTemperature = Math.round(response.data.main.temp);
    getForecast(response.data.coord);
}

function searchCity(city) {
  let key = "8fa8d64086e29f081d52f48a507241e6";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "8fa8d64086e29f081d52f48a507241e6";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  alert(
    `Your Latitude is ${position.coords.latitude} and your longitude is ${position.coords.longitude} `
  );
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToCels(event) {
  event.preventDefault();
  
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiumTemperature);
}

function convertToFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrTemp = (celsiumTemperature * 9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
}
let celsiumTemperature = null;

let celsiumLink = document.querySelector("#celsium");
celsiumLink.addEventListener("click", convertToCels);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let dateElement = document.querySelector(".date");
let now = new Date();
dateElement.innerHTML = formatDate(now);

let search = document.querySelector("form");
search.addEventListener("submit", findCity);

let correctLocationButton = document.querySelector("#location-button");
correctLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Dnipro");
displayForecast()