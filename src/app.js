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

  return `${day}, ${hours}:${minutes}`;
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

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col">
       <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
       <img
         src="https://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
         alt=""
         width="42"
       />
       <div class="weather-forecast-temperature">
         <span class="weather-forecast-temperature-max">${Math.round(
           forecastDay.temp.max
         )}°</span>
         <span class="weather-forecast-temperature-min">${Math.round(
           forecastDay.temp.min
         )}°</span>
       </div>
     </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `6fda14409b2eb3e68886c6b8cbdc1307`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiURL).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let highTempElement = document.querySelector("#highTemp");
  let lowTempElement = document.querySelector("#lowTemp");
  let dateElement = document.querySelector("#date");
  let descriptionIcon = document.querySelector("#icon");

  windElement.innerHTML = Math.round(response.data.wind.speed) + " m/h";
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  highTempElement.innerHTML = Math.round(response.data.main.temp_max) + "°";
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min) + "°";
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionIcon.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature = response.data.main.temp;
  windSpeed = response.data.wind.speed;
  highTemp = response.data.main.temp_max;
  lowTemp = response.data.main.temp_min;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `6fda14409b2eb3e68886c6b8cbdc1307`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function findMe(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7fe45580c3148481cf4fc668b847a961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMe);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let locateMeButton = document.querySelector("#locateMeButton");
locateMeButton.addEventListener("click", currentLocation);

search("Detroit");
