// form submission
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  const city = form.elements.city.value;
  form.elements.city.value = "";

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4dd89761137dda26370a37ca9fb0c106`
    )
    .then(function (response) {
      console.log(response);
      create(response);
    })
    .catch(function (error) {
      outputError();
    });

  e.preventDefault();
});

// create data

const container = document.querySelector(".weather");


function create(data) {
  //data extraction

  const city = data.data.name;
  const country = data.data.sys.country;
  const weatherData = data.data.main;
  const temp = Math.round(weatherData.temp - 273);
  const feelsLike = Math.round(weatherData.feels_like - 273);
  const pressure = weatherData.pressure;
  const humidity = weatherData.humidity;
  const description = data.data.weather[0].main;
  const wind = data.data.wind.speed;
  const iconId = data.data.weather[0].icon;
  const visibilty = data.data.visibility;

  const otherDetails = {
    Pressure: pressure,
    Humidity: humidity,
    "Wind Speed": wind,
    Visibilty: visibilty,
  };

  const units = [" hPa", "%", " m/s", " m"];

  //create elements

  //outer  

  const outer = document.createElement("div");
  outer.classList.add("row");
  outer.classList.add("g-2");
  outer.classList.add("outer");
  outer.setAttribute("data-aos", "fade-down");
  outer.setAttribute("data-aos-duration", "850");  

  const closeButton = document.createElement("div");
  closeButton.classList.add("d-flex");
  closeButton.classList.add("justify-content-end");
  closeButton.classList.add("col-lg-12");

  const close = document.createElement("button");
  close.classList.add("btn-close");

  close.addEventListener("click", ()=>{
    outer.remove();
  })

  closeButton.append(close);
  outer.append(closeButton);  

  //city name

  const name = document.createElement("div");
  name.classList.add("col-lg-12");
  name.classList.add("text-center");
  name.classList.add("name");
  name.append(`${city}, ${country}`);  
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
  img.classList.add("icon");

  const temperature = document.createElement("span");  
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
  const otherContainer = document.createElement("div");
  otherContainer.classList.add("row");
  otherContainer.classList.add("g-4");
  let iconIndex = 1;

  for(let i in otherDetails){

    const holder = document.createElement("div");
    holder.classList.add("col-lg-6");
    holder.classList.add("d-flex");
    holder.classList.add("justify-content-center");
    holder.classList.add("align-items-center");
    holder.classList.add("holder");

    const detIcon = document.createElement("img");
    detIcon.classList.add("des_icon");    
    detIcon.classList.add("mx-2");  
    detIcon.src = `./assests/icons/${iconIndex}.png`;
    holder.append(detIcon);

    const detText = document.createElement("div");
    detText.classList.add("det-text");
    detText.classList.add("text-center");
    detText.classList.add("mx-2");

    const bold = document.createElement("b");
    bold.append(`${i}`);

    detText.append(bold);
    detText.append(`: ${otherDetails[i]}${units[iconIndex-1]}`)
    holder.append(detText);

    iconIndex+=1;

    otherContainer.append(holder);

  }

  outer.append(otherContainer);

  container.prepend(outer);

  ScrollToTarget(outer);
}

//error

function outputError(){
  const ele = document.createElement("div");
  ele.classList.add("error");
  ele.classList.add("alert");
  ele.classList.add("alert-danger");
  ele.classList.add("text-center");

  const closeButton = document.createElement("div");
  closeButton.classList.add("d-flex");
  closeButton.classList.add("justify-content-end");
  closeButton.classList.add("col-lg-12");

  const close = document.createElement("button");
  close.classList.add("btn-close");

  close.addEventListener("click", ()=>{
    ele.remove();
  })

  closeButton.append(close);
  ele.append(closeButton);  

  ele.append("Oops..Looks like we ran into an error!");
  
  const breakL = document.createElement("br");
  ele.append(breakL);
  ele.append(breakL);

  ele.append("Make sure you've entered a valid city name");

  container.prepend(ele);

}

//test data
const testData = {
  data: {
    name: "New Delhi",
    sys: { country: "IN" },
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
    visibility: 3000,
  },
};

// create(testData);

function ScrollToTarget(target)
{
     target.scrollIntoView(true, {behaviour: "smooth"});
}


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 4dd89761137dda26370a37ca9fb0c106
