
import 'regenerator-runtime/runtime';
import getWeatherIcon from './icons'; 
import './style.css';

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
        changeHumidity(weatherData)
        changeWeatherIcon(weatherData)
        changeWeatherName(weatherData)
        changeWind(weatherData)
    }

    const changeLocationName = (weatherData) =>{
        const locationMark = document.querySelector("#location")
        locationMark.textContent = weatherData.name
    }

    const changeMainTemp = (weatherData) => {
        const mainTemp = document.querySelector("#mainTemp")
        mainTemp.textContent = `${weatherData.main["temp"]}\u00B0`
    }

    const changeHumidity = (weatherData) => {
        const humidity = document.querySelector("#humidity")
        humidity.textContent = `Humidity: ${weatherData.main["humidity"]}%`
    }

    const changeWind = (weatherData) => {
        const wind = document.querySelector("#wind")
        wind.textContent = `Wind: ${weatherData.wind["speed"]}`
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