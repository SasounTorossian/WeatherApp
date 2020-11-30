let image = document.querySelector(".image")

// Conversion between F and C button.

const getWeather = (async () => {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&appid=4afc0e7848e13a7ccc62b3be90d8b38f')
    const responseJson = await response.json()

    const weatherTempKelvin = responseJson.main.temp
    const weatherTempCelsius = (weatherTempKelvin - 273.15).toFixed(2)
    const weatherHumid = responseJson.main.humidity
    const weatherDesc = responseJson.weather[0].description
    const weathericon = responseJson.weather[0].icon
    const iconPng = await fetch("http://openweathermap.org/img/wn/" + weathericon + "@2x.png")
    const iconPngUrl = iconPng.url

    image.src = iconPngUrl

    console.log(weatherTempCelsius)
    console.log(weatherHumid)
    console.log(weatherDesc)
})()