function searchCity(city) {
  let apiKey = "co008925a4etb7034fb83ba3509c17f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temp = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector(
    "#weather-conditions-description"
  );
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  temperatureElement.innerHTML = temp;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.temperature.humidity;
  dateElement.innerHTML = formatDate(date);

  updateTemperatureCircle(temp);
  getForecast(response.data.city);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");

function updateTemperatureCircle(temperature) {
  let circle = document.querySelector("#current-temperature-container");

  if (temperature > 22) {
    circle.style.background =
      "linear-gradient(109.6deg, rgb(162, 2, 63) 11.2%, rgb(231, 62, 68) 53.6%, rgb(255, 129, 79) 91.1%)";
  } else if (temperature >= 12) {
    circle.style.background =
      "linear-gradient(109.6deg, rgb(255, 207, 84) 11.2%, rgb(255, 158, 27) 91.1%)";
  } else {
    circle.style.background =
      "radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%)";
  }
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="row">
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" alt="" width="30" />
        <div class="weather-forecast-temperature"> <span class="weather-forecast-temperature-max">18°</span> <span class="weather-forecast-temperature-min">12°</span></div>
      </div>
    </div>
`;
  });
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();

function getForecast(city) {
  let apiKey = "co008925a4etb7034fb83ba3509c17f3";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiURL);
  axios(apiURL).then(displayForecast);
}
