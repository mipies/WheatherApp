let CitySearch = document.querySelector("#Search-City");
CitySearch.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "41d2e38564bc792ac8788e0097b24f74";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(getWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let CityName = document.querySelector("#City-input");
  search(CityName.value);
}

function getWeather(response) {
  let City = document.querySelector("#city");
  City.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#displayTemp");
  currentTemp.innerHTML = (`${temperature}°C`);

  let weatherDescription =document.querySelector("#weatherState");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let feelTemp=Math.round(response.data.main.feels_like);
  let feelsLike=document.querySelector("#feelsLike");
  feelsLike.innerHTML=(`Feels like: ${feelTemp}°C`);

  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed*2.24);
  wind.innerHTML=(`Wind: ${windSpeed} mph`);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = (`Humidity: ${response.data.main.humidity}%`);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `/img/${response.data.weather[0].icon}.png`);
  getForecast(response.data.coord);
}


function setDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  return `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
}
let today = new Date();
let currentDate = document.querySelector("#date");
currentDate.innerHTML = setDate(today);

function setTime(date) {
  let hours=(`0`+date.getHours()).slice(-2);
  let minutes=(`0`+date.getMinutes()).slice(-2);
  return `${hours}:${minutes}`
}
let time=document.querySelector("#time");
time.innerHTML=setTime(today);

function getForecast(coordinates) {
let apiKey = "41d2e38564bc792ac8788e0097b24f74";
let apiURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(displayForecast);
}

function formatDay (timestamp) {
  let date= new Date(timestamp*1000);
  let day = date.getDay();
  let days= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response){
  let forecastElement=document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
  if (index < 5 ) {
  forecastHTML = forecastHTML + `
  <div class="col"><span id="weekDay">${formatDay(forecastDay.dt)}</span><br>
    <img src="img/${forecastDay.weather[0].icon}.png" alt="weatherIcon" id="smallicon"><br />
     <span class="maxTemp">${Math.round(forecastDay.temp.max)}</span>° | <span class="minTemp">${Math.round(forecastDay.temp.min)}</span>°<br>
    <span id="forDescription">${forecastDay.weather[0].main}</span>
  </div>
  `;
  };
  forecastHTML = forecastHTML + ` </div>`;

  forecastElement.innerHTML=forecastHTML;
});
}

search("Edinburgh");