function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let dateTimeElement = document.querySelector("#date-time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#weather-app-emoji");
  
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-emoji"/>`;
    cityElement.innerHTML = `<span class="material-symbols-outlined">
  location_on
  </span>${response.data.city}`;
    dateTimeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
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
  
    let options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    let formattedDate = date.toLocaleDateString("en-AU", options);
  
    return formattedDate;
  }
  
  function searchCity(city) {
    let apiKey = "8fcoftcc9ae54bfab9de675ca310cfc4";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(refreshWeather);
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value);
  }
  
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);
  
  searchCity("Paris");
