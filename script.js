// apiKey = c7eb3aa40b11e98d4d62953c24692272
let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let dateTime = document.getElementById("date-time");
let humidityText = document.getElementById("humidity");
let wind = document.getElementById("wind");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// These are the elements for showing weather for next 7 days but weather api is charging for more than 1 day forecast so i have commented these.

// let day1Val = document.getElementById("day1-weather-value");
// let day1 = document.getElementById("day1");
// let day2Val = document.getElementById("day2-weather-value");
// let day2 = document.getElementById("day2");
// let day3Val = document.getElementById("day3-weather-value");
// let day3 = document.getElementById("day3");
// let day4Val = document.getElementById("day4-weather-value");
// let day4 = document.getElementById("day4");
// let day5Val = document.getElementById("day5-weather-value");
// let day5 = document.getElementById("day5");
// let day6Val = document.getElementById("day6-weather-value");
// let day6 = document.getElementById("day6");
// let day7Val = document.getElementById("day7-weather-value");
// let day7 = document.getElementById("day7");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = "";
});

const getFiveDaysWeather = async (lon, lat) => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=c7eb3aa40b11e98d4d62953c24692272`,
            { mode: "cors" }
        );
        const weatherData = await response.json();
        
        
        var table = document.getElementById("myTable");
        for(var i = 0; i < weatherData.list.length; ++i){
            const { dt_txt } = weatherData.list[i];
            var dateTime = String(dt_txt);
            var date = new Date(dateTime);
            let curr_date = monthNames[date.getMonth()] + " " + date.getDate();
            const { feels_like, humidity } = weatherData.list[i].main;
            const { main } = weatherData.list[i].weather[0];
            const { speed } = weatherData.list[i].wind;
            
  	        var row = table.insertRow(i + 1);
  	        var dateCell = row.insertCell(0);
            var timeCell = row.insertCell(1);
  	        var climateCell = row.insertCell(2);
            var temperatureCell = row.insertCell(3);
            var humidityCell = row.insertCell(4);
            var speedCell  = row.insertCell(5);

  	        dateCell.innerHTML = curr_date;
            timeCell.innerHTML = date.toLocaleTimeString("en-US");
  	        climateCell.innerHTML = main;
            temperatureCell.innerHTML = Math.round(feels_like - 273);
            humidityCell.innerHTML = humidity;
            speedCell.innerHTML = speed;
        }
        
    }
    catch(e){
        alert("No Data Found!!");
    }
}
const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7eb3aa40b11e98d4d62953c24692272`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    const { lon, lat } = weatherData.coord;
    const { name } = weatherData;
    const { feels_like, humidity } = weatherData.main;
    const { id, main } = weatherData.weather[0];
    const { speed } = weatherData.wind;
    
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var date = new Date();
    let curr_date =
      monthNames[date.getMonth()] +
      " " +
      date.getDate() +
      "," +
      date.toLocaleTimeString("en-US");

    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);
    humidityText.textContent = "Humidity: " + humidity + "%";
    wind.textContent = "Wind: " + speed + "m/s";
    dateTime.textContent = curr_date;

    if (id < 300 && id >= 200) {
      tempicon.src = "./icons/storm.png";
    } else if (id < 400 && id >= 300) {
      tempicon.src = "./icons/drizzle.png";
    } else if (id < 600 && id >= 500) {
      tempicon.src = "./icons/rain.png";
    } else if (id < 700 && id >= 600) {
      tempicon.src = "./icons/snowflake.png";
    } else if (id < 800 && id > 700) {
      tempicon.src = "./icons/mist.png";
    } else if (id == 800) {
      tempicon.src = "./icons/sun.png";
    } else if (id > 800) {
      tempicon.src = "./icons/cloud.png";
    }

    getFiveDaysWeather(lon, lat);

  } catch (e) {
    alert("city not found");
  }
};

window.addEventListener("load", () => {
  let api;
  let long;
  let lat;
  let load = false;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      load = true;
      long = position.coords.longitude;
      lat = position.coords.latitude;
      api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c7eb3aa40b11e98d4d62953c24692272`;

      fetch(api)
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          const { name } = data;
          const { feels_like, humidity } = data.main;
          const { id, main } = data.weather[0];
          const { speed } = data.wind;

          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          var date = new Date();
          let curr_date =
            monthNames[date.getMonth()] +
            " " +
            date.getDate() +
            "," +
            date.toLocaleTimeString("en-US");

          loc.textContent = name;
          climate.textContent = main;
          tempvalue.textContent = Math.round(feels_like - 273);
          humidityText.textContent = "Humidity: " + humidity + "%";
          wind.textContent = "Wind: " + speed + "m/s";
          dateTime.textContent = curr_date;

          if (id < 300 && id >= 200) {
            tempicon.src = "./icons/storm.png";
          } else if (id < 400 && id >= 300) {
            tempicon.src = "./icons/drizzle.png";
          } else if (id < 600 && id >= 500) {
            tempicon.src = "./icons/rain.png";
          } else if (id < 700 && id >= 600) {
            tempicon.src = "./icons/snowflake.png";
          } else if (id < 800 && id > 700) {
            tempicon.src = "./icons/mist.png";
          } else if (id == 800) {
            tempicon.src = "./icons/sun.png";
          } else if (id > 800) {
            tempicon.src = "./icons/cloud.png";
          }
        });
    });
  }

  if (load === false) {
    getWeather("New Delhi");
  }
});