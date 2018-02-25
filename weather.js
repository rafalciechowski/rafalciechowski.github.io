let updateWidget = function(data) {

  console.log("Got weather data: ", data)
  // YOUR CODE GOES HERE
  let currentLocationTitle = data.name
  let currentRoundTemp = Math.round(data.main.temp)
  jQuery(".card-title").html(currentLocationTitle)
  jQuery(".card-img-top").attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png")
  jQuery(".card-text").html("It is "+currentRoundTemp+" degrees outside.")
  // HINT:
  // Weather icons are provided for you. Sample URL: http://openweathermap.org/img/w/01d.png
  // The very last part ('01d.png') should be obtained from the weather information.

}



//Part 1: Pulls current weather data in Paris and updates widget immediate after Get Current Temp button clicked
let getWeatherParis = function(event) {
  let latitude = '48.8500';
  let longitude = '2.3500';
  let apiKey = '12ce5328d9574efe205c0767567ba66d'; // REPLACE THIS VALUE with your own key.
  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}

jQuery("#get_forecast").on("click",getWeatherParis)



//Part 2: Refreshes widget with current local weather data after user permits access
let getWeatherLocal = function(event) {
  console.log(event)
  latitude = event.coords.latitude.toFixed(4);
  longitude = event.coords.longitude.toFixed(4);
  let apiKey = '12ce5328d9574efe205c0767567ba66d'; // REPLACE THIS VALUE with your own key.
  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'

  fetch(weatherServiceURL).then(convertToJSON).then(updateWidget).catch(displayError);
}



let handlePosition = function(event) {
  console.log("Starting handlePosition...")
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherLocal);
  console.log("Ending handlePosition...")
}

let link = jQuery("#get_forecast")
link.on("click", handlePosition);


////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANY CODE BEYOND THIS POINT
////////////////////////////////////////////////////////////

let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
