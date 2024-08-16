const apiKey = "9739c0d479bb6bb861a14c939107b29a";  // Your OpenWeatherMap API key
const searchButton = document.getElementById('searchButton');
const pinCodeInput = document.getElementById('pinCodeInput');
const cityElement = document.getElementById('city');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

searchButton.addEventListener('click', () => {
    const pinCode = pinCodeInput.value;
    if (pinCode) {
        fetchWeatherData(pinCode);
    } else {
        alert('Please enter a pin code.');
    }
});

async function fetchWeatherData(pinCode) {
    try {
        // Make sure to include the country code if needed
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${pinCode},IN&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Log the data to check its structure
        console.log('API Response:', data);

        if (response.ok) {
            displayWeatherData(data);
        } else {
            // Display detailed error message
            const errorMessage = data.message || 'Location not found or invalid API key. Please try again.';
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}

function displayWeatherData(data) {
    const { name, weather, main, wind } = data;
    cityElement.textContent = `Location: ${name}`;
    descriptionElement.textContent = `Condition: ${weather[0].description}`;
    temperatureElement.textContent = `Temperature: ${main.temp}°C`;
    humidityElement.textContent = `Humidity: ${main.humidity}%`;
    windElement.textContent = `Wind Speed: ${wind.speed} m/s`;
}
