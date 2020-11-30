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
eval("let image = document.querySelector(\".image\")\r\n\r\n// Conversion between F and C button.\r\n\r\nconst getWeather = (async () => {\r\n    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=4afc0e7848e13a7ccc62b3be90d8b38f')\r\n    const responseJson = await response.json()\r\n\r\n    const weatherTempKelvin = responseJson.main.temp\r\n    const weatherTempCelsius = (weatherTempKelvin - 273.15).toFixed(2)\r\n    const weatherHumid = responseJson.main.humidity\r\n    const weatherDesc = responseJson.weather[0].description\r\n    const weathericon = responseJson.weather[0].icon\r\n    const iconPng = await fetch(\"http://openweathermap.org/img/wn/\" + weathericon + \"@2x.png\")\r\n    const iconPngUrl = iconPng.url\r\n\r\n    image.src = iconPngUrl\r\n\r\n    console.log(weatherTempCelsius)\r\n    console.log(weatherHumid)\r\n    console.log(weatherDesc)\r\n})()\n\n//# sourceURL=webpack://y/./src/index.js?");
/******/ })()
;