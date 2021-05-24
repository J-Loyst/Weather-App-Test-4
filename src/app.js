function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = response.data.main.temp;
}

let apiKey = `6fda14409b2eb3e68886c6b8cbdc1307`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
