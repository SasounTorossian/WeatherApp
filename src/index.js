const appID = "4afc0e7848e13a7ccc62b3be90d8b38f"

const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = document.querySelector("#location-input")
    main(location.value)
    form.reset()
})

const infoCardVisibility = (visibility) => {
    const infoCard = document.querySelector(".info-card")
    infoCard.style.visibility = visibility ? "visible" : "hidden"
}

const weatherCardVisibility = (visibility) => {
    const cards = document.querySelectorAll(".weather-card")
    cards.forEach(card => {
        card.style.visibility = visibility ? "visible" : "hidden"
    })
}

infoCardVisibility(false)
weatherCardVisibility(false)

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

const updateInfoCard = (info) => {
    const infoCardText = document.querySelector(".info-card-text")
    infoCardText.innerText = info
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

const getWeatherJSON = async (location) => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appID}`)
    const responseJson = await response.json()

    if(response.status != 200) throw response.status
    else return responseJson
}

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

const updateDOM = async (weatherData) => {
    infoCardVisibility(true)
    weatherCardVisibility(true)

    updateInfoCard(weatherData.location)

    updateWeatherTemp(kelvinToCelsius(weatherTempKelvin))
    updateWeatherText(weatherData.weatherDesc)
    updateWeatherImage(weatherData.iconPngUrl)
    updateWeatherHumidity(weatherData.weatherHumid)    
}

const main = async (location) => {
    try
    {
        let weatherJson = await getWeatherJSON(location)
        let weatherData = await getWeatherData(weatherJson)
        weatherData = {...weatherData, location}
        updateDOM(weatherData)
    }
    catch(err) 
    {
        console.log(err)
        infoCardVisibility(true)
        weatherCardVisibility(false)
        updateInfoCard("error")
    }
}