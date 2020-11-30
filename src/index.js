const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let location = document.querySelector("#location-input")
    console.log(location.value)
})

let weatherTempKelvin

const kelvinToCelsius  = (k) => (k - 273.15).toFixed(1) + "°C"

const kelvinToFahrenheit = (k) => (k * 9/5 - 459.67).toFixed(1) + "°F"

const updateWeatherTemp = (temp) => {
    let temperature = document.querySelector("#weather-temperature")
    temperature.innerText = temp
}

const updateWeatherText = (txt) => {
    let text = document.querySelector("#weather-text")
    text.innerText = txt.charAt(0).toUpperCase() + txt.slice(1)
}

const updateWeatherImage = (img) => {
    let image = document.querySelector("#weather-image")
    image.src = img
}

const updateWeatherHumidity = (hum) => {
    let humidity = document.querySelector("#weather-humidity")
    humidity.innerText = hum + "%"
}

// Conversion between F and C button.
$(function() {
    $('#temp-toggle').change(function() {
        let state = $(this).prop('checked')
        if(state) {
            const celsius = kelvinToCelsius(weatherTempKelvin)
            updateWeatherTemp(celsius)
        }
        else {
            const fahrenheit = kelvinToFahrenheit(weatherTempKelvin)
            updateWeatherTemp(fahrenheit)
        }
    })
})

// get rid of iife. call when needed, hide when not in use or error
const getWeather = (async () => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=4afc0e7848e13a7ccc62b3be90d8b38f')
    const responseJson = await response.json()

    weatherTempKelvin = responseJson.main.temp
    const weatherTempCelsius = (weatherTempKelvin - 273.15).toFixed(1)
    const weatherHumid = responseJson.main.humidity
    const weatherDesc = responseJson.weather[0].description
    const weathericon = responseJson.weather[0].icon
    const iconPng = await fetch("http://openweathermap.org/img/wn/" + weathericon + "@2x.png")
    const iconPngUrl = iconPng.url

    updateWeatherText(weatherDesc)
    updateWeatherImage(iconPngUrl)
    updateWeatherHumidity(weatherHumid)
    updateWeatherTemp(kelvinToCelsius(weatherTempKelvin))

    console.log(weatherTempCelsius)
    console.log(weatherHumid)
    console.log(weatherDesc)
    console.log(responseJson)
})()