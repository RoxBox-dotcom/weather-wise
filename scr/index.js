function searchCity(city) {
  let apiKey = "co008925a4etb7034fb83ba3509c17f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemp);
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temp = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temp;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
