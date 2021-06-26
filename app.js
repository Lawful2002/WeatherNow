// form-validation
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

// form submission
const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
  const city = form.elements.city.value;

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4dd89761137dda26370a37ca9fb0c106`)
  .then(function (response) {    
    console.log(response);
  })
  .catch(function (error) {    
    console.log(error);
  })


  e.preventDefault();

  

})


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// 4dd89761137dda26370a37ca9fb0c106