var inputvalue = document.querySelector("#city");
var btn = document.querySelector('#submit'); // Updated to match the corrected HTML
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var apik = "26ee9a58935feee7f8a7ef8bce8f0d6d";

function conversion(val) {
    return (val - 273.15).toFixed(2); // Changed to 2 decimal places for better readability
}

btn.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
    .then(res => res.json())
    .then(data => {
        var nameval = data['name'];
        var descrip = data['weather'][0]['description'];
        var temperature = data['main']['temp'];
        var windspeed = data['wind']['speed'];

        city.innerHTML = `Weather of <span>${nameval}</span>`;
        temp.innerHTML = `Temperature: <span>${conversion(temperature)}°C</span>`;
        description.innerHTML = `Sky Condition: <span>${descrip}</span>`;
        wind.innerHTML = `Wind Speed: <span>${windspeed} km/h</span>`;
    })
    .catch(err => alert('You entered a wrong city name'));
});
