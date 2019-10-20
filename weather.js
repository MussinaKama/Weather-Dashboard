//search button to be clicked and that triggers ajax call

$("#search-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b72b06e94024103dcc49ba18cc9af972";
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response)

    var cityDiv =$("<div class='city'>");
    var cityName = response.name;
    var h1 = $("<h1>").html(cityName + " (" + moment().format("L") + ")" + "<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    cityDiv.append(h1);
    var temperature = response.main.temp;
    var pTwo = $("<p>").html("Temperature: " + Math.round((temperature - 273.15) * 1.80 + 32) + " ℉");
    cityDiv.append(pTwo);
    var humidity = response.main.humidity;
    var pThree = $("<p>").html("Humidity: " + humidity + " %");
    cityDiv.append(pThree);
    var windSpeed = response.wind.speed;
    var pFour = $("<p>").html("Wind speed: " + windSpeed + " MPH");
    cityDiv.append(pFour);
  
    $("#city-view").prepend(cityDiv);
    })

    fiveDayForecast(city);
    
})



function fiveDayForecast (city) {
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=b72b06e94024103dcc49ba18cc9af972";
    $.ajax({
        url: queryURL5,
        method: "GET"
    }).then(function(forecast) {
        console.log(forecast);
    
        
        var time = "12:00:00";
        
        for (var i = 0; i < forecast.list.length; i ++) {
            var forecastTime = forecast.list[i].dt_txt;
            console.log(forecastTime)
            if (forecastTime.indexOf(time) !== -1) {
                pOne = $("<p>").html("<img src='http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png' alt='Icon depicting current weather'>") 
                pTwo = $("<p>").html("Temp: " + Math.round((forecast.list[i].main.temp - 273.15) * 1.80 + 32) + " ℉");
                pThree = $("<p>").html("Humidity: " + forecast.list[i].main.humidity + " %");
                
                $(".forecast-view").append(pOne, pTwo, pThree);
            
            }

           
    
        // var cardDiv1 = $("<div>");
        // var p1 = $("<p>").html(forecastDate[0]);
        // // // var p2 = $("<p>").html("<img src='http://openweathermap.org/img/w/" + forecastIcon[0] + ".png' alt='Icon depicting current weather.'>");
        // var p3 = $("<p>").html(forecastTemp[0] + " F");
        // var p4 = $("<p>").html(forecastHumidity[0] + " %")
        // cardDiv1.append(p3, p4);
        // $("#forecast-view").html(cardDiv1);
        }

    })

}





    // var forecastDiv = $("<div class='card'");
    // var p1 = $("<p>").html("<img src='http://openweathermap.org/img/w/" + forecast.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
    // forecastDiv.append(p1);
    // var tempDiv = forecast.list[0].main.temp;
    // var p2 = $("<p>").html("Temp: " + Math.round((tempDiv - 273.15) * 1.80 + 32) + " ℉");
    // forecastDiv.append(p2);
    // var humidityDiv = forecast.list[0].main.humodity;
    // var p3 = $("<p>").html("Humidity: " + humidityDiv + " %");
    // forecastDiv.append(p3);
    // $("#forecast-view").prepend(forecastDiv);
   // })


    //     var forecastDate = [];
        
    //     // // var forecastIcon = [];
    //     // var forecastTemp = [];
    //     // var forecastHumidity = [];
        
    //     
    //         if ( === tomorrow's date) {
    //             forecastDate.push(forecast.list[i])
    //         }
    //         forecastDate.push(forecast.list[i].dt_txt);
    //         console.log(forecastDate)
    //     //     // forecastIcon.push(response.list[i].weather[0].icon);
    //     // forecastTemp.push(forecastEl.main.temp);
    //     // forecastHumidity.push(forecastEl.main.humidity);
    //     }
    // })
       
        
