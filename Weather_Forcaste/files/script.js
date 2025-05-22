const getWeatherData = async(city) => {
    const apiKey = 'c1ab022632a49e14ff21bcbb78a22194';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if(!city.trim()){
        console.log("Please enter city name");
        return;
    }

    try {
        const fetchData = await fetch(url);
        const data = await fetchData.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        let temp = document.getElementsByClassName('temp')[0];
        let wind = document.getElementsByClassName('value')[0]; 
        let hum = document.getElementsByClassName('value')[1];
        let des = document.getElementsByClassName('description')[0];
        let cityName = document.getElementsByClassName('city-name')[0];
        let country = document.getElementsByClassName('country')[0];
        let weatherImg = document.querySelector('.image-info img');

        temp.innerHTML = `${data.main.temp} °C`;
        des.innerHTML = `${data.weather[0].main}`;
        hum.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} Km/hr`;
        cityName.innerHTML = `${data.name}`;
        country.innerHTML = `${data.sys.country}`;


let weatherCondition = data.weather[0].main.toLowerCase();

switch(weatherCondition) {
    case "clear":
        weatherImg.src = "/images/clear.png";
        break;
    case "clouds":
        weatherImg.src = "/images/cloud.png";
        break;
    case "mist":
    case "fog":
    case "haze":
        weatherImg.src = "/images/mist.png";
        break;
    case "rain":
    case "drizzle":
        weatherImg.src = "/images/rain.png";
        break;
    case "snow":
        weatherImg.src = "/images/snow.png";
        break;
    default:
        weatherImg.src = "/images/clear.png";
        break;
}

    } catch (err) {
        console.error("Error found:", err);

        let weatherImg = document.querySelector('.image-info img');
        weatherImg.src = "/images/404.png"; 

       
        document.getElementsByClassName('temp')[0].innerHTML = `-- °C`;
        document.getElementsByClassName('description')[0].innerHTML = `Not Found`;
        document.getElementsByClassName('value')[0].innerHTML = `-- Km/hr`;
        document.getElementsByClassName('value')[1].innerHTML = `-- %`;
        document.getElementsByClassName('city-name')[0].innerHTML = `Unknown`;
        document.getElementsByClassName('country')[0].innerHTML = `--`;
    }
}

function getWeather() {
    let city = document.getElementById("city").value;
    getWeatherData(city);
}
