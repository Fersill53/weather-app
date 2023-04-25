const srchBtn = document.getElementById('srchBtn');
const todDatTime = dayjs();

$('#todDatTime').text(todDatTime.format('MMM D, YYYY, HH:mm:ss'));

const apiKey = "d3ef9f8072526baffe21e357d0d0efc5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather? units=metric&q=Houston";


async function checkWeather() {
  const response = await fetch(apiUrl = `&appid=${apiKey}`);
  var data = await response.json();
  
  console.log(data)
}
checkWeather()

//every time a city name is typed, a button appears with city name that can be clicked again.

//save info to local storage

//save after reload

//weather conditions are displayed for city