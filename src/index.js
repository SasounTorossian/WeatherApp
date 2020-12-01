const appID = "4afc0e7848e13a7ccc62b3be90d8b38f"

const infoCardVisibility = (visibility, error) => {
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

const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
    const location = document.querySelector("#location-input")
    e.preventDefault()
    getWeather(location.value).catch(err => console.error(err));
    form.reset()
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

// handle in main function?
async function getWeather(location)  {

        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appID}`)
        
        if(response.status == 200) {
            const responseJson = await response.json()
            weatherTempKelvin = responseJson.main.temp
            const weatherDesc = responseJson.weather[0].description
            const weathericon = responseJson.weather[0].icon
            const weatherHumid = responseJson.main.humidity
            const iconPng = await fetch("http://openweathermap.org/img/wn/" + weathericon + "@2x.png")
            const iconPngUrl = iconPng.url

            infoCardVisibility(true)
            weatherCardVisibility(true)
            
            updateInfoCard(location)
        
            updateWeatherText(weatherDesc)
            updateWeatherImage(iconPngUrl)
            updateWeatherHumidity(weatherHumid)
        
            updateWeatherTemp(kelvinToCelsius(weatherTempKelvin))
        }
        else if (response.status == 400) {
            infoCardVisibility(true)
            weatherCardVisibility(false)
            updateInfoCard("Please enter city")
        }
        else {
            infoCardVisibility(true)
            weatherCardVisibility(false)
            updateInfoCard("error")
        }
}