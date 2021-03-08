

function search(event) {
  event.preventDefault();

  let currentCity = document.querySelector("#search-city");
  let city = document.querySelector("#cityName");
  city.innerHTML = (currentCity.value);

  displayWeather(currentCity.value);
}

function displayWeather(city) {
  console.log(city);
  let apiKey = "e12d4984bdb9b1f3003f6782997bbdc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function showTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#degrees");
  tempNow.innerHTML = `${currentTemp}°`;

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
  let cityHere = (response.data.name);
  let cityHereNow = document.querySelector("#cityName");
  cityHereNow.innerHTML = `${cityHere}`;

  let tempHere = Math.round(response.data.main.temp);
  let tempHereNow = document.querySelector("#degrees");
  tempHereNow.innerHTML = `${tempHere}°`
}


function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}


let button = document.querySelector("#gps-Location");
button.addEventListener("click", getCurrentPosition);


