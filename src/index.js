import "./styles/style.scss";
import { config } from "../config";
// API key provided by openweathermap
const appID = config.API_KEY

// Handles submit event on form by stopping defauly behaviour, and calling main with input variable as a parameter.
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    e.stopPropagation()
    const location = document.querySelector("#location-input")
    main(location.value)
    form.reset()
})

// Hides or reveals the information card that displays city.
const infoCardVisibility = (visibility) => {
    const infoCard = document.querySelector(".info-card")
    infoCard.style.visibility = visibility ? "visible" : "hidden"
}

// Hides or reveals the weather card that displays weather information about selected city.
const weatherCardVisibility = (visibility) => {
    const cards = document.querySelectorAll(".weather-card")
    cards.forEach(card => {
        card.style.visibility = visibility ? "visible" : "hidden"
    })
}

// Initalise both cards as invisible at first.
infoCardVisibility(false)
weatherCardVisibility(false)

// Updates the content of the information card.
const updateInfoCard = (info) => {
    const infoCardText = document.querySelector(".info-card-text")
    infoCardText.innerText = info
}
 
// Global to store kelvin temp from API call. Is used later for conversions.
let weatherTempKelvin

// Coonverts kelvin to celsius and appends °C.
const kelvinToCelsius  = (k) => (k - 273.15).toFixed(1) + "°C"

// Coonverts kelvin to fahrenheit and appends °F.
const kelvinToFahrenheit = (k) => (k * 9/5 - 459.67).toFixed(1) + "°F"

// Updates the content of the temperature card.
const updateWeatherTemp = (temp) => {
    let temperature = document.querySelector("#weather-temperature")
    temperature.innerText = temp
}

// updates the content of the text card.
const updateWeatherText = (txt) => {
    let text = document.querySelector("#weather-text")
    text.innerText = txt.charAt(0).toUpperCase() + txt.slice(1)
}

// Updates the image displayed in the text card.
const updateWeatherImage = (img) => {
    let image = document.querySelector("#weather-image")
    image.src = img
}

// Updates the content of the humidity card.
const updateWeatherHumidity = (hum) => {
    let humidity = document.querySelector("#weather-humidity")
    humidity.innerText = hum + "%"
}

// In event of error, add is-invald class to input for visual feedback to user.
const toggleError = (err) => {
    const location = document.querySelector("#location-input")
    
    if(err) location.classList.add("is-invalid")
    else location.classList.remove("is-invalid")
}

// Button handler for temperature unit toggle.
$(function() {
    $('#temp-toggle').change(function() {
        let state = $(this).prop('checked')
        let temp

        if(state) temp = kelvinToCelsius(weatherTempKelvin)
        else temp = kelvinToFahrenheit(weatherTempKelvin)

        updateWeatherTemp(temp)
    })
})

// Fetches initial data from openweathermap API and conerts to JSON.
const getWeatherJSON = async (location) => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appID}`)
    const responseJson = await response.json()

    if(response.status != 200) throw response.status
    else return responseJson
}

// Extract data from weather json and returns them as object.
const getWeatherData = async (weatherJSON) => {
    weatherTempKelvin = weatherJSON.main.temp
    const weatherDesc = weatherJSON.weather[0].description
    const weathericon = weatherJSON.weather[0].icon
    const weatherHumid = weatherJSON.main.humidity
    const iconPng = await fetch("http://openweathermap.org/img/wn/" + weathericon + "@2x.png")
    const iconPngUrl = iconPng.url

    if(iconPng.status != 200) throw iconPng.status
    else return {weatherDesc, weatherHumid, iconPngUrl}
}

// Takes weather data and updates contents of page with that information.
const updateDOM = async (weatherData) => {
    infoCardVisibility(true)
    weatherCardVisibility(true)

    updateInfoCard(weatherData.location)

    updateWeatherTemp(kelvinToCelsius(weatherTempKelvin))
    updateWeatherText(weatherData.weatherDesc)
    updateWeatherImage(weatherData.iconPngUrl)
    updateWeatherHumidity(weatherData.weatherHumid)    
}

// Main code that handles all lower-level calls. Also catches and deals with any error thrown by functions.
const main = async (location) => {
    try
    {
        toggleError(false)
        let weatherJson = await getWeatherJSON(location)
        let weatherData = await getWeatherData(weatherJson)
        weatherData = {...weatherData, location}
        updateDOM(weatherData)
    }
    catch(err) 
    {
        console.log(err)
        toggleError(true)
    }
}