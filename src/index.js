
import 'regenerator-runtime/runtime';

const systemModule = (() => {
    async function getWeather(location){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=50f2bb6a8e9ef7686c7837c2f0961653`,
            {mode: 'cors'})
            const weatherData = await response.json()
            return weatherData
        } catch{

        }
    }

    return {
        getWeather
    }
    
})();

const displayModule = (() => {
    const locationMark = document.querySelector("#location")

    const weatherData = systemModule.getWeather("london")
    console.log(weatherData)
})();