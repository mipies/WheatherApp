let CitySearch = document.querySelector("#Search-City");
CitySearch.addEventListener("submit", Search);

function Search(event) {
  event.preventDefault();
  let CityName = document.querySelector("#City-input");
  let City = document.querySelector("#city");
  City.innerHTML = CityName.value;
  let apiKey = "41d2e38564bc792ac8788e0097b24f74";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${CityName.value}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(getWeather);
}

function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#displayTemp");
  currentTemp.innerHTML = (`${temperature}°C`);
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