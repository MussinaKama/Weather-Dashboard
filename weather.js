//search button to be clicked and that triggers ajax call

$("#search-city").on("click", function (event) {
    event.preventDefault();
    $("#city-view").empty();
    var city = $("#city-input").val().trim();
    localStorage.setItem("city", city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b72b06e94024103dcc49ba18cc9af972";
    
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response)
    var urlForIndex = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=b72b06e94024103dcc49ba18cc9af972&lat=" + response.coord.lat + "&lon=" + response.coord.lon +"&cnt=" + 1;
    var cityDiv =$("<div class='city'>");
    var h1 = $("<h1>").html(response.name + " (" + moment().format("L") + ")" + "<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    var pTwo = $("<p>").html("Temperature: " + Math.round((response.main.temp - 273.15) * 1.80 + 32) + " ℉");
    var pThree = $("<p>").html("Humidity: " + response.main.humidity + " %");
    var pFour = $("<p>").html("Wind speed: " + response.wind.speed + " MPH");
    var indexOfUv = $("<p>").html("UV Index: " + urlForIndex["value"]);
    cityDiv.append(h1, pTwo, pThree, pFour, indexOfUv);
    $("#city-view").prepend(cityDiv);
    
    })
    
    fiveDayForecast(city);

    var button = $("<button>").addClass("buttons");
    button.prepend(localStorage.getItem("city"));
    $("#search-history").append(button);
    
})

function fiveDayForecast (city) {
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=b72b06e94024103dcc49ba18cc9af972";
    $.ajax({
        url: queryURL5,
        method: "GET"
    }).then(function(forecast) {
        console.log(forecast);
        $(".forecast-view").empty();
        
        var time = "12:00:00";
        for (var i = 0; i < forecast.list.length; i ++) {
            var forecastTime = forecast.list[i].dt_txt;
            console.log(forecastTime)
            if (forecastTime.indexOf(time) !== -1) {
                
                var splitDate = forecast.list[i].dt_txt.split(" ");
                var newDate = splitDate[0].slice(0, 10).split("-");
                cardDiv = $("<div>").addClass("card");
                pOne = $("<p>").html(newDate[1] + "/" + newDate[2] + "/" + newDate[0]);
                pTwo = $("<p>").html("<img src='http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png' alt='Icon depicting current weather'>") 
                pThree = $("<p>").html("Temp: " + Math.round((forecast.list[i].main.temp - 273.15) * 1.80 + 32) + " ℉");
                pFour = $("<p>").html("Humidity: " + forecast.list[i].main.humidity + " %");
                cardDiv.append(pOne, pTwo, pThree, pFour);
                $(".forecast-view").append(cardDiv);
                
            }
        }
    })
}





        
