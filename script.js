function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedneday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formathours(timestamp)}`;
}

function formathours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();

  let currentCity = document.querySelector("#search-city");
  let city = document.querySelector("#cityName");
  city.innerHTML = currentCity.value;
  displayWeather(currentCity.value);
}

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;

  let tempNow = document.querySelector("#degrees");
  tempNow.innerHTML = Math.round(celsiusTemperature);

  let attribute = document.querySelector("#description");
  attribute.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity-element");
  humidity.innerHTML = response.data.main.humidity;

  let speed = document.querySelector("#wind-speed");
  speed.innerHTML = Math.round(response.data.wind.speed);

  let dateNow = document.querySelector("#date");
  dateNow.innerHTML = formatDate(response.data.dt * 1000);

  let weatherIcon = document.querySelector("#iconNow");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].icon);
}

function displayfarenheit(event) {
  event.preventDefault();
  let farenheitNow = document.querySelector("#degrees");
  let farenheitTempNow = (celsiusTemperature * 9) / 5 + 32;
  farenheitNow.innerHTML = Math.round(farenheitTempNow);
}

function displaycelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#degrees");
  tempNow.innerHTML = Math.round(celsiusTemperature);
}

function showForecast(response) {
  let forecastNow = document.querySelector("#forecastSixDays");
  forecastNow.innerHTML = null;
  let forecastedWeather = null;

  for (index = 0; index < 6; index++) {
    forecastedWeather = response.data.list[index];
    forecastNow.innerHTML += `
  <div class= "col-2">
      <h5>
          ${formathours(forecastedWeather.dt * 1000)}
      </h5>
         </br>
      <div>
        <img  class="img-fluid" src="http://openweathermap.org/img/wn/${forecastedWeather.weather[0].icon}@2x.png"/>
      <div class= "weather-forecast">
          </br>
      <strong>${Math.round(
      forecastedWeather.main.temp_max
    )}°</strong> ${Math.round(forecastedWeather.main.temp_min)}°
      </div >
  </div >
    `;
  }
}

function displayWeather(city) {
  let apiKey = "e12d4984bdb9b1f3003f6782997bbdc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);

}

let celsiusTemperature = null;

let form = document.querySelector("#city-name");
form.addEventListener("submit", search);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayfarenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displaycelsius);

function showTempNow(response) {
  let cityHereNow = document.querySelector("#cityName");
  cityHereNow.innerHTML = response.data.name;

  displayWeather(cityHereNow.innerHTML);

  let tempHereNow = document.querySelector("#degrees");
  tempHereNow.innerHTML = Math.round(response.data.main.temp);

  let attributeNow = document.querySelector("#description");
  attributeNow.innerHTML = response.data.weather[0].description;

  let humidityNow = document.querySelector("#humidity-element");
  humidityNow.innerHTML = response.data.main.humidity;

  let windHereNow = document.querySelector("#wind-speed");
  windHereNow.innerHTML = Math.round(response.data.wind.speed);

  let dateHereNow = document.querySelector("#date");
  dateHereNow.innerHTML = formatDate(response.data.dt * 1000);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "e12d4984bdb9b1f3003f6782997bbdc8";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${geoApiUrl}`).then(showTempNow);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#gps-Location");
button.addEventListener("click", getCurrentPosition);

let forecastWeatherDays = document.querySelector("#forecastSixDays");

let weekly = [{
  time: '12:00',
  img: 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
  min: 5,
  max: 7
},
{
  time: '15:00',
  img: 'https://ssl.gstatic.com/onebox/weather/64/snow_s_rain.png',
  min: 6,
  max: 7
},
{
  time: '12:00',
  img: 'https://ssl.gstatic.com/onebox/weather/64/rain_heavy.png',
  min: 7,
  max: 7
},
{
  time: '12:00',
  img: 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
  min: 8,
  max: 10
},
{
  time: '12:00',
  img: 'https://ssl.gstatic.com/onebox/weather/64/sunny.png',
  min: 10,
  max: 11
},
{
  time: '12:00',
  img: 'https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png',
  min: 9,
  max: 10
}]

let html = '';
for (let index = 0; index < weekly.length; index++) {
  const day = weekly[index];
  html += `<div class= "col-2">
      <h5>
          ${day.time}
      </h5>
         </br>
      <img
      src="  ${day.img}" alt = ""
    />
      <div class= "weather-forecast">
          </br>
      <strong>   ${day.min}°</strong>    ${day.max}°
      </div>
  </div>`
}

forecastWeatherDays.innerHTML = html;
/*

forecastWeatherDays.innerHTML = `
  <div class= "col-2">
      <h5>
          12:00
      </h5>
         </br>
      <img
      src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png" alt = ""
    />
      <div class= "weather-forecast">
          </br>
      <strong> 12°</strong>  11°
      </div>
  </div>
  `;

forecastWeatherDays.innerHTML += `
  <div class= "col-2">
      <h5>
          15:00
      </h5>
         </br>
      <img
      src="https://ssl.gstatic.com/onebox/weather/64/snow_s_rain.png" alt = ""
    />
      <div class= "weather-forecast">
          </br>
      <strong> 11°</strong>  8°
      </div>
  </div>
  `;

forecastWeatherDays.innerHTML += `
  <div class= "col-2">
      <h5>
          18:00
      </h5>
         </br>
      <img
      src= "https://ssl.gstatic.com/onebox/weather/64/rain_light.png" alt = ""
    />
      <div class= "weather-forecast">
          </br>
      <strong> 8°</strong>  7°
      </div>
  </div>
  `;
forecastWeatherDays.innerHTML += `
  <div class= "col-2">
      <h5>
          21:00
      </h5>
         </br>
      <img
      src= "https://ssl.gstatic.com/onebox/weather/64/cloudy.png" alt = ""
    />
      <div class= "weather-forecast">
          </br>
      <strong> 7°</strong>  6°
      </div>
  </div>
  `;
forecastWeatherDays.innerHTML += `
  <div class= "col-2">
      <h5>
          12:00
      </h5>
         </br>
      <img
      src= "https://ssl.gstatic.com/onebox/weather/64/cloudy.png" alt = ""
    />
      <div class= "weather-forecast">
          </br>
      <strong> 9°</strong>  8°
      </div>
  </div>
  `;
forecastWeatherDays.innerHTML += `
  <div class= "col-2">
      <h5>
          12:00
      </h5>
         </br>
      <img
      src= "https://ssl.gstatic.com/onebox/weather/64/cloudy.png" alt = ""
    />
      <div class= "weather-forecast">
          </br>
      <strong> 9°</strong>  7°
      </div>
  </div>
  `;

*/