/** @format */

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
	const location =
		document.getElementById("locationInput").value || "Nairobi";

	if (location) {
		const url = `https://open-weather13.p.rapidapi.com/city/${location}/EN`;

		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key":
					"392184318dmsh2bc3d17b1cfd34bp12b13ejsn93e6b9289232",
				"x-rapidapi-host": "open-weather13.p.rapidapi.com",
			},
		};

		try {
			const response = await fetch(url, options);
			const result = await response.json();

			// Log the entire result to see its structure
			console.log(result);

			// Check if the required data exists before accessing it
			if (result && result.main && result.weather && result.sys) {
				displayWeather(result);
			} else {
				alert("Weather data not available for this location.");
			}
		} catch (error) {
			console.error(error);
			alert("Failed to fetch weather data. Please try again later.");
		}
	} else {
		alert("Please enter a valid city.");
	}
}

function displayWeather(data) {
	const locationName = document.getElementById("locationName");
	const temperature = document.getElementById("temperature");
	const weatherDescription = document.getElementById("weatherDescription");
	const weatherIcon = document.getElementById("weatherIcon");
	const alerts = document.getElementById("alerts");
	const wind = document.getElementById("wind");
	const humidity = document.getElementById("humidity");
	const pressure = document.getElementById("pressure");
	const visibility = document.getElementById("visibility");
	const sunrise = document.getElementById("sunrise");
	const sunset = document.getElementById("sunset");
	const cloudiness = document.getElementById("cloudiness");

	// Convert temperature from Fahrenheit to Celsius
	const tempCelsius = ((data.main.temp - 32) * (5 / 9)).toFixed(2); // Convert and round to 2 decimal places

	// Update DOM elements with the weather data
	locationName.textContent = `${data.name}, ${data.sys.country}`;
	temperature.textContent = `Temperature: ${tempCelsius} °C`;
	weatherDescription.textContent = `Condition: ${data.weather[0].description}`;
	weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

	// Additional weather data
	wind.textContent = `Wind: ${data.wind.speed} m/s, direction: ${data.wind.deg}°`;
	humidity.textContent = `Humidity: ${data.main.humidity}%`;
	pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
	visibility.textContent = `Visibility: ${(data.visibility / 1000).toFixed(
		2
	)} km`; // Convert meters to kilometers
	cloudiness.textContent = `Cloudiness: ${data.clouds.all}%`;

	// Sunrise and Sunset in human-readable format
	const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
	const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
	sunrise.textContent = `Sunrise: ${sunriseTime}`;
	sunset.textContent = `Sunset: ${sunsetTime}`;

	// Temperature alerts
	if (tempCelsius < 0) {
		alerts.textContent = "⚠️ Freezing temperature alert!";
		alerts.style.color = "blue";
	} else if (tempCelsius < 10) {
		alerts.textContent = "⚠️ Very cold temperature alert!";
		alerts.style.color = "blue";
	} else if (tempCelsius < 20) {
		alerts.textContent = "⚠️ Cold temperature alert!";
		alerts.style.color = "blue";
	} else if (tempCelsius < 30) {
		alerts.textContent = "⚠️ Cool temperature alert!";
		alerts.style.color = "green";
	} else if (tempCelsius < 40) {
		alerts.textContent = "⚠️ Warm temperature alert!";
		alerts.style.color = "yellow";
	} else if (tempCelsius < 50) {
		alerts.textContent = "⚠️ Hot temperature alert!";
		alerts.style.color = "orange";
	} else if (tempCelsius < 60) {
		alerts.textContent = "⚠️ Very hot temperature alert!";
		alerts.style.color = "red";
	} else {
		alerts.textContent = "";
	}
}
