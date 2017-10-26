/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        document.getElementById("getWeather").addEventListener("click",getWeather);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function getWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            $("#geoLoc").html("latitude: "+ position.coords.latitude + "<br> longitude: " + position.coords.longitude);

            //jquery current weather via openweathermapp

            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=eff37b2ab474a1a38fb46396135c86d9";

            //http://api.openweathermap.org/data/2.5/weather?lat=43.77746452&lon=-79.2314454&APPID=eff37b2ab474a1a38fb46396135c86d9

            $.getJSON(weatherURL).done(function(data){


                
                $("#mainWeather").html("Main Weather Condition is: "+ data.weather[0].main);
                $("#subweather").html("Main Weather Condition is: "+ data.weather[0].description);
                $("#currTemp").html("current temp: "+ (data.main.temp - 273.15) + " deg");

                var minTempInCels = data.main.temp_min-273.15;
                var maxTempInCels = data.main.temp_max-273.15;

                $("#minTemp").html("Minimum temp is: "+ minTempInCels + " deg");
                $("#maxTemp").html("Maximum temp: "+ maxTempInCels + " deg");

                var windSpeedinKm = data.wind.speed * 3.6;
                $("#windSpeed").html("Wind Speed is : "+ windSpeedinKm + "Km/hr");

                $("#windDirection").html("Wind Direction is : "+ data.wind.deg);

                $("#humidity").html("Humidity is : "+ data.main.humidity + "%");
                $("#pressure").html("Pressure is : "+ data.main.pressure + "Ph");


                 var sunriseDate = new Date(data.sys.sunrise * 1000);
                $('#sunrise').text("SunRise Time is " + sunriseDate.toLocaleTimeString());
 
                var sunsetDate = new Date(data.sys.sunset * 1000);
                $('#sunset').text("SunSet Time is " + sunsetDate.toLocaleTimeString());
            });
        },function(er){
            alert(er.message);
        });
    }
}
