const apiKey = "5614260b92de45df92171534252706"; // Replace with your WeatherAPI.com key

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = "City not found.";
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>${data.current.condition.text}</strong></p>
      <p>🌡️ ${data.current.temp_c} °C</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <p>🌬️ Wind: ${data.current.wind_kph} kph</p>
      <img src="https:${data.current.condition.icon}" alt="Weather Icon">
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data.";
  }
}

function resetWeather() {
  document.getElementById("city").value = "";
  document.getElementById("result").innerHTML = "";
}

function fillCity(cityName) {
  document.getElementById("city").value = cityName;
  getWeather();
}

function randomCity() {
  const cities = ["London", "Tokyo", "Paris", "Mumbai", "New York", "Cairo", "Sydney"];
  const random = cities[Math.floor(Math.random() * cities.length)];
  fillCity(random);
}