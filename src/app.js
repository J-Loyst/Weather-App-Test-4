function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let highTempElement = document.querySelector("#highTemp");
  let lowTempElement = document.querySelector("#lowTemp");
  windElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
}

let apiKey = `6fda14409b2eb3e68886c6b8cbdc1307`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
