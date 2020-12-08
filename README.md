# WeatherApp

Weathaer app based off Odin project. Takes a city as input and makes a call to openweathermap, which provides the temperature, weather, and humidity. Used as an opportunity to learn Bootstrap basics as well.

[Weather gif demo](Weather.gif)

Project was initially structured using Bootstrap and only later was javascript functionality added. Bootstrap provides a very quick and simple way of designing a website, but can also be quite limiting to a beginner who does not know where Bootstrap ends and custom .css begins. Overall created a simple interface that gets the job done.

Index.js is also relatively simple, with the primary empthasis being on smaller async/wait functions. General structure of API call -> Get Data -> Update dom with data, seems simple enough, but error handling and input validation was required to gracefully give a warning in the event of a bad API call.

Realised that I my API key was visible during development, so it had to be changed, and the new API key is currently being imported from a config file which is not uploaded into git. This unfortunately prevents any live demo hosted on github.io, due to the lack of API key.

Was a good project, though main takeaway was practicing Bootstrap instead of the API call, which was comparatively easy.
