const locationInput = document.querySelector('.location-input');
const searchBtn = document.querySelector('.search-btn');
const locationBtn = document.querySelector('.location-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');

const apiKey = 'YOUR_API_KEY_HERE';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    }
});

locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherData(`${latitude},${longitude}`);
    });
});

function fetchWeatherData(location) {
    const url = `${apiEndpoint}?q=${location}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const locationName = data.name;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            locationElement.textContent = locationName;
            temperatureElement.textContent = `Temperature: ${temperature}°C`;
           