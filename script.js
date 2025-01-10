const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = '4911447b515ca4954c81150c388f43a8';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                alert("City not found!");
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const winds = document.querySelector('.weather-details .winds span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'D:/images/clear.png'; // Use relative paths
                    break;
                case 'Rain':
                    image.src = 'D:/images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'D:/images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'D:/images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'D:/images/mist.png';
                    break;
                default:
                    image.src = 'D:/images/cloud.png';
                    break;
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            winds.innerHTML = `${json.wind.speed} km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'block';
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
});
