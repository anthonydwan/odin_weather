import "regenerator-runtime/runtime";
import getWeatherIcon from "./icons";
import "./style.css";

const systemModule = (() => {
  let unitType = "metric";
  let location = "London";
  const search = document.querySelector("#search");
  const warning = document.querySelector("#warning");


  let unitObject = {
    metric: {
      tempUnit: "C",
      speed: "km/h",
    },
    imperial: {
      tempUnit: "F",
      speed: "mph",
    },
  };

  const checkValidCity = (weatherData) => {
    if (weatherData.cod === "404") {
        console.log(warning)
      warning.classList.add("warningActive");
      return false;
    } else {
      warning.classList.remove("warningActive");
      return true;
    }
  };

  window.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
      const weatherData = await getWeather(search.value);
      const validity = await checkValidCity(weatherData);
      if (validity) {
        location = search.value;
        displayModule.printWeatherData(location);
      } 
      search.value = "";
      await console.log(search.value);
    }
  });

  const changeUnits = (mode = "metric") => {
    if (mode === "metric" || mode === "imperial") {
      unitType = mode;
    }
  };

  async function getWeather(location) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=50f2bb6a8e9ef7686c7837c2f0961653&units=${unitType}`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      return weatherData;
    } catch {}
  }

  return {
    getWeather,
    changeUnits,
    get unitObject() {
      return unitObject;
    },
    get unitType() {
      return unitType;
    },
    get location() {
      return location;
    },
  };
})();

const displayModule = (() => {
  const printWeatherData = async (location) => {
    const weatherData = await systemModule.getWeather(location);
    console.log(weatherData);
    changeLocationName(weatherData);
    changeMainTemp(weatherData);
    changeHumidity(weatherData);
    changeWeatherIcon(weatherData);
    changeWeatherName(weatherData);
    changeWind(weatherData);
  };

  const changeLocationName = (weatherData) => {
    const locationMark = document.querySelector("#location");
    locationMark.textContent = weatherData.name;
  };

  const changeMainTemp = (weatherData) => {
    const mainTemp = document.querySelector("#mainTemp");
    mainTemp.textContent = `${weatherData.main["temp"]}\u00B0${
      systemModule.unitObject[systemModule.unitType]["tempUnit"]
    }`;
  };

  const changeHumidity = (weatherData) => {
    const humidity = document.querySelector("#humidity");
    humidity.textContent = `${weatherData.main["humidity"]}%`;
  };

  const changeWind = (weatherData) => {
    const wind = document.querySelector("#wind");
    wind.textContent = `${weatherData.wind["speed"]} ${
      systemModule.unitObject[systemModule.unitType]["speed"]
    }`;
  };

  const changeWeatherIcon = (weatherData) => {
    const weatherIcon = document.querySelector("#weatherIcon");
    weatherIcon.innerHTML = getWeatherIcon(weatherData.weather[0]["icon"]);
  };

  const changeWeatherName = (weatherData) => {
    const weatherName = document.querySelector("#weatherName");
    weatherName.textContent = `${weatherData.weather[0]["description"]}`;
  };

  const celciusB = document.querySelector("#celciusB");
  const fahrenheitB = document.querySelector("#fahrenheitB");

  celciusB.addEventListener("click", function () {
    systemModule.changeUnits("metric");
    printWeatherData(systemModule.location);
    activeButton();
  });

  fahrenheitB.addEventListener("click", function () {
    systemModule.changeUnits("imperial");
    printWeatherData(systemModule.location);
    activeButton();
  });

  const activeButton = () => {
    if (systemModule.unitType === "metric") {
      celciusB.classList.add("active");
      fahrenheitB.classList.remove("active");
    } else if (systemModule.unitType === "imperial") {
      celciusB.classList.remove("active");
      fahrenheitB.classList.add("active");
    }
  };

  printWeatherData(systemModule.location);
  activeButton();
  return {
    printWeatherData,
  };
})();
