// form-validation
(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// form submission
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const city = form.elements.city.value;

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4dd89761137dda26370a37ca9fb0c106`
    )
    .then(function (response) {
      console.log(response);
      create(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  e.preventDefault();
});

//test data
const testData = {
  data: {
    name: "New Delhi",
    main: {
      feels_like: 313.97,
      humidity: 44,
      pressure: 1004,
      temp: 309.24,
      temp_max: 309.24,
      temp_min: 309.24,
    },
    wind: { speed: 2.06, deg: 320 },
    weather: [{ id: 721, main: "Haze", description: "haze", icon: "50d" }],
    visibilty: 3000
  }
};

// create data

const container = document.querySelector(".weather");

function create(data) {
  //data extraction

  const city = data.data.name;
  const weatherData = data.data.main;
  const temp = Math.round(weatherData.temp - 273);
  const feelsLike = Math.round(weatherData.feels_like -273);
  const pressure = weatherData.pressure;
  const humidity = weatherData.humidity;
  const description = data.data.weather[0].main;
  const wind = data.data.wind.speed;
  const iconId = data.data.weather[0].icon;
  const visibilty = data.data.visibilty;

  const otherDetails = {
    press: pressure,
    hum: humidity,
    win: wind,
    vis: visibilty
  }

  //create elements

  //outer

  const outer = document.createElement("div");
  outer.classList.add("row");
  outer.classList.add("g-2");
  outer.classList.add("outer");

  //city name

  const name = document.createElement("div");
  name.classList.add("col-lg-12");
  name.classList.add("text-center");
  name.classList.add("name");  
  name.append(city);
  outer.append(name);

  //icon and temp

  const tempIcon = document.createElement("div");
  tempIcon.classList.add("col-lg-12");
  tempIcon.classList.add("d-flex");
  tempIcon.classList.add("justify-content-center");
  tempIcon.classList.add("align-items-center");
  tempIcon.classList.add("tempIcon");  

  let img = document.createElement("img");
  img.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  img.classList.add("col-lg-3");
  img.classList.add("icon");

  const temperature = document.createElement("span");
  temperature.classList.add("col-lg-6");
  temperature.classList.add("text-center");
  temperature.classList.add("temperature");
  temperature.append(temp);
  temperature.append("\u00B0 C");

  tempIcon.append(img);
  tempIcon.append(temperature); 

  outer.append(tempIcon);

  //description

  const des = document.createElement("div");
  des.classList.add("col-lg-12");
  des.classList.add("text-center");
  des.classList.add("des");
  des.append(description);    
  outer.append(des);

  //feels like
  const feels = document.createElement("div");
  feels.classList.add("col-lg-12");
  feels.classList.add("text-center");
  feels.classList.add("feels");
  feels.append("Feels like  "); 
  feels.append(feelsLike); 
  feels.append("\u00B0 C");   
  outer.append(feels);

  //other details
  

  container.prepend(outer);
}

// create(testData)

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 4dd89761137dda26370a37ca9fb0c106
