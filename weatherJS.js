function formatDate(date) {
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
      "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day}, ${hours} : ${minutes}`;
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
  