
import 'regenerator-runtime/runtime';
import getWeatherIcon from './icons'; 

const systemModule = (() => {
    let unitObject = {
        units: "metric"}

    async function getWeather(location){
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=50f2bb6a8e9ef7686c7837c2f0961653&units=${unitObject.units}`,
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
    const printWeatherData = async (location) => {
        const weatherData = await systemModule.getWeather(location)
        console.log(weatherData)
        changeLocationName(weatherData)
        changeMainTemp(weatherData)
        changeHighLowTemp(weatherData)
        changeFeelsLike(weatherData)
        changeHumidity(weatherData)
        changeWeatherIcon(weatherData)
        changeWeatherName(weatherData)
    }

    const changeLocationName = (weatherData) =>{
        const locationMark = document.querySelector("#location")
        locationMark.textContent = weatherData.name
    }

    const changeMainTemp = (weatherData) => {
        const mainTemp = document.querySelector("#mainTemp")
        mainTemp.textContent = weatherData.main["temp"]
    }

    const changeHighLowTemp = (weatherData) => {
        const highLowTemp = document.querySelector("#highLowTemp")
        highLowTemp.textContent = `${weatherData.main["temp_min"]} - ${weatherData.main["temp_max"]}` 
    }

    const changeFeelsLike = (weatherData) => {
        const feelsLike = document.querySelector("#feelsLike")
        feelsLike.textContent = `Feels like: ${weatherData.main["feels_like"]}`
    }

    const changeHumidity = (weatherData) => {
        const humidity = document.querySelector("#humidity")
        humidity.textContent = `Humidity: ${weatherData.main["humidity"]}%`
    }

    const changeWeatherIcon = (weatherData) => {
        const weatherIcon = document.querySelector("#weatherIcon")
        weatherIcon.innerHTML = getWeatherIcon(weatherData.weather[0]["icon"])
    }

    const changeWeatherName = (weatherData)=>{
        const weatherName = document.querySelector("#weatherName")
        weatherName.textContent = `${weatherData.weather[0]["description"]}`
    }
    printWeatherData("Sydney")

})();