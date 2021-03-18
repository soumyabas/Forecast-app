
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

  let days = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  return `${day} ${hours}: ${minutes} `;
}


function search(event) {
  event.preventDefault();

  let currentCity = document.querySelector("#search-city");
  let city = document.querySelector("#cityName");
  city.innerHTML = (currentCity.value);
  displayWeather(currentCity.value);
}

function showTemp(response) {

  let tempNow = document.querySelector("#degrees");
  tempNow.innerHTML = Math.round(response.data.main.temp);

  let attribute = document.querySelector("#description");
  attribute.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity-element");
  humidity.innerHTML = response.data.main.humidity;

  let speed = document.querySelector("#wind-speed");
  speed.innerHTML = Math.round(response.data.wind.speed);

  let dateNow = document.querySelector("#date");
  dateNow.innerHTML = formatDate(response.data.dt * 1000);

}


function displayWeather(city) {
  let apiKey = "e12d4984bdb9b1f3003f6782997bbdc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(showTemp);
}

let form = document.querySelector("#city-name");
form.addEventListener("submit", search);





function showLocation(position) {

  let lat = (position.coords.latitude);
  let lon = (position.coords.longitude);


  let apiKey = "e12d4984bdb9b1f3003f6782997bbdc8";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${geoApiUrl}`).then(showTempNow);
}


function showTempNow(response) {
  let cityHereNow = document.querySelector("#cityName");
  cityHereNow.innerHTML = response.data.name;

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


function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}


let button = document.querySelector("#gps-Location");
button.addEventListener("click", getCurrentPosition);


