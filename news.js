let updateWorldNews = function(data) {
  console.log(data)
  jQuery("#world-img1").attr("src",data.results[0].multimedia[2].url)
  jQuery('#world-hl1').html(data.results[0].title)
  jQuery("#world-p1").html(data.results[0].abstract)
  jQuery("#world-img2").attr("src",data.results[1].multimedia[2].url)
  jQuery('#world-hl2').html(data.results[1].title)
  jQuery("#world-p2").html(data.results[1].abstract)
  jQuery("#world-img3").attr("src",data.results[3].multimedia[2].url)
  jQuery('#world-hl3').html(data.results[3].title)
  jQuery("#world-p3").html(data.results[3].abstract)
}


let updateBusinessNews = function(data) {
  console.log(data)
  jQuery("#biz-img1").attr("src",data.articles[0].urlToImage)
  jQuery('#biz-hl1').html(data.articles[0].title)
  jQuery("#biz-p1").html(data.articles[0].description)
  jQuery("#biz-img2").attr("src",data.articles[1].urlToImage)
  jQuery('#biz-hl2').html(data.articles[1].title)
  jQuery("#biz-p2").html(data.articles[1].description)
  jQuery("#biz-img3").attr("src",data.articles[2].urlToImage)
  jQuery('#biz-hl3').html(data.articles[2].title)
  jQuery("#biz-p3").html(data.articles[2].description)
}


let updateWeather = function(data) {
  console.log(data)
  let currentLocationTitle = data.name
  let currentRoundTemp = Math.round(data.main.temp)
  jQuery(".card-title").html(currentLocationTitle)
  jQuery(".card-img-top").attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png")
  jQuery(".card-text").html("It is "+currentRoundTemp+" degrees outside.")
}


let getWorldNews = function(event) {
  let NYTAPIurl = 'http://api.nytimes.com/svc/topstories/v2/';
  let NYTAPIcategory = 'world';
  let NYTAPIoutput = '.json';
  let NYTAPIkey = '?api-key=b35d7efc9ec64198beaf4b1d62a1245c'
  let NYTAPIget = NYTAPIurl + NYTAPIcategory + NYTAPIoutput + NYTAPIkey;
  fetch(NYTAPIget).then(convertToJSON).then(updateWorldNews).catch(displayError)
}

jQuery().ready(getWorldNews)


let getBusinessNews = function(event) {
  let NewsAPIurl = 'https://newsapi.org/v2/';
  let NewsAPItype = 'top-headlines?';
  let NewsAPIcountry = 'country=us';
  let NewsAPIcategory = '&category=business';
  let NewsAPIkey = '&apiKey=1a4ec77820c84ee7a90d47b29590c396';
  let NewsAPIget = NewsAPIurl + NewsAPItype + NewsAPIcountry + NewsAPIcategory + NewsAPIkey;
  fetch(NewsAPIget).then(convertToJSON).then(updateBusinessNews).catch(displayError)
}

jQuery().ready(getBusinessNews)


let getWeather = function(event) {
  let latitude = '41.8781';
  let longitude = '-87.6298';
  let apiKey = '12ce5328d9574efe205c0767567ba66d'; // REPLACE THIS VALUE with your own key.
  let weatherServiceURL = 'https://api.openweathermap.org/data/2.5/weather?'
  weatherServiceURL += 'lat=' + latitude
  weatherServiceURL += '&lon=' + longitude
  weatherServiceURL +='&appid=' + apiKey + '&units=imperial'
  fetch(weatherServiceURL).then(convertToJSON).then(updateWeather).catch(displayError)
}

jQuery().ready(getWeather)


let convertToJSON = function(rawData) { return rawData.json(); }
let displayError = function(error) { console.debug(error); }
