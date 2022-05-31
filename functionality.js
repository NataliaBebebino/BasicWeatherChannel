let btnRequest = document.querySelector(".btn-request");
let inputCity = document.querySelector(".input");
let cityName = document.querySelector("#city-name");
let cityTemperature = document.querySelector("#city-temperature");
let weatherDescription = document.querySelector("#weather-description");



function loadCity() {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&appid=95176c8edea30e33338e0eaddd53a916&units=metric", function (data) {
        //console.log(data); 
        displayContent(data);
    })
}

function displayContent(data) {
    document.querySelector(".container").style.visibility = "visible";

    cityName.textContent = data.name;

    cityTemperature.textContent = (data.main.temp).toFixed(1);

    let weatherIconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";
    //console.log(weatherIconCode);

    weatherDescription.textContent = data.weather[0].description;

}

function cleanInput() {
    inputCity.value = "";
}

function validateEmpty() {
    if (inputCity.value === "") {
        alert("Please enter a city");
        return false;
    }

    return true;
}

function validateCity() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity.value + "&appid=95176c8edea30e33338e0eaddd53a916&units=metric"})
        .fail(function(jqXHR) {
    
        if (jqXHR.status === 404) {
            alert('The city you entered does not exist in our database');
            return false;
        }     
      });

      return true;
}

function requestWeather() {
    if (validateEmpty() && validateCity()) {
        loadCity(inputCity.value);
        cleanInput();     
    }
}

btnRequest.addEventListener("click", function () {
    requestWeather();
})

inputCity.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        requestWeather();
    }
})


