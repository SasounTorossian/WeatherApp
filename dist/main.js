/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("\r\n\r\nlet weatherTempKelvin\r\n\r\nconst kelvinToCelsius  = (k) => (k - 273.15).toFixed(2) + \"°C\"\r\n\r\nconst kelvinToFahrenheit = (k) => (k * 9/5 - 459.67).toFixed(2) + \"°F\"\r\n\r\nconst updateWeatherTemp = (temp) => {\r\n    let temperature = document.querySelector(\"#weather-temperature\")\r\n    temperature.innerText = temp\r\n}\r\n\r\nconst updateWeatherText = (txt) => {\r\n    let text = document.querySelector(\"#weather-text\")\r\n    text.innerText = txt.charAt(0).toUpperCase() + txt.slice(1)\r\n}\r\n\r\nconst updateWeatherImage = (img) => {\r\n    let image = document.querySelector(\"#weather-image\")\r\n    image.src = img\r\n}\r\n\r\nconst updateWeatherHumidity = (hum) => {\r\n    let humidity = document.querySelector(\"#weather-humidity\")\r\n    humidity.innerText = hum + \"%\"\r\n}\r\n\r\n\r\n\r\n\r\n// Conversion between F and C button.\r\n$(function() {\r\n    $('#temp-toggle').change(function() {\r\n        let state = $(this).prop('checked')\r\n        if(state) {\r\n            //C\r\n            // Check if already C or F\r\n            // get temp from somewhere, call a func to convert to F, and set display\r\n            const celsius = kelvinToCelsius(weatherTempKelvin)\r\n            updateWeatherTemp(celsius)\r\n        }\r\n        else {\r\n            //F\r\n            // Ditto, but opposite\r\n            const fahrenheit = kelvinToFahrenheit(weatherTempKelvin)\r\n            updateWeatherTemp(fahrenheit)\r\n        }\r\n    })\r\n})\r\n\r\nconst getWeather = (async () => {\r\n    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=4afc0e7848e13a7ccc62b3be90d8b38f')\r\n    const responseJson = await response.json()\r\n\r\n    weatherTempKelvin = responseJson.main.temp\r\n    const weatherTempCelsius = (weatherTempKelvin - 273.15).toFixed(2)\r\n    const weatherHumid = responseJson.main.humidity\r\n    const weatherDesc = responseJson.weather[0].description\r\n    const weathericon = responseJson.weather[0].icon\r\n    const iconPng = await fetch(\"http://openweathermap.org/img/wn/\" + weathericon + \"@2x.png\")\r\n    const iconPngUrl = iconPng.url\r\n\r\n    updateWeatherText(weatherDesc)\r\n    updateWeatherImage(iconPngUrl)\r\n    updateWeatherHumidity(weatherHumid)\r\n    updateWeatherTemp(kelvinToCelsius(weatherTempKelvin))\r\n\r\n    console.log(weatherTempCelsius)\r\n    console.log(weatherHumid)\r\n    console.log(weatherDesc)\r\n})()\n\n//# sourceURL=webpack://y/./src/index.js?");
/******/ })()
;