const srchBtn = document.getElementById('srchBtn');
const todDatTime = dayjs();

$('#todDatTime').text(todDatTime.format('MMM D, YYYY, HH:mm:ss'));

const apiKey = "d3ef9f8072526baffe21e357d0d0efc5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}";

async function checkWeather(city) {
    console.log(city,"city")
    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=Imperial`
  let response = await fetch(cityUrl);
  var data = await response.json();
  
  console.log(data)
  var lat = data.coord.lat
  var lon = data.coord.lon
  fiveDay(lat, lon)
  var h2El = $("<h2>")
  h2El.text(data.name)
  var pEl = $('<p>')
  pEl.text(`Temp: ${data.main.temp}`)
  var imgEl = $("<img>")
  imgEl.attr("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
  $("#wthrRes").html(h2El)
  $("#wthrRes").append(pEl)
  $("#wthrRes").append(imgEl)
}

$('#srchBtn').on('click', function(event) {
    var city = $('#search').val()
    checkWeather(city)
    var dataLocal = JSON.parse(localStorage.getItem("weatherApp")) || []
    dataLocal.push(city)
    localStorage.setItem('weatherApp', JSON.stringify(dataLocal))
    displaylocalStorage()
})

async function fiveDay(lat, lon) {
    
    const cityUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=Imperial`
  let response = await fetch(cityUrl);
  var data = await response.json();
    
    console.log(data)
    var htmlCode = $("<section>")
    for(let i=0; i<data.list.length; i=i+8){
        var divEl = $("<div>")
        divEl.addClass("card")
        var h2El = $("<h2>")
        h2El.text(data.list[i].dt_txt)
        var pEl = $('<p>')
        pEl.text(`Temp: ${data.list[i].main.temp}`)
        var imgEl = $("<img>")
        imgEl.attr("src",`https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`)
        divEl.append(h2El)
        divEl.append(pEl)
        divEl.append(imgEl)
        htmlCode.append(divEl)
        console.log("i",i,divEl)
    }
    console.log(htmlCode,"HTML")
    $("#wthrGrid").append(htmlCode)
}
function displaylocalStorage(){
    var dataLocal = JSON.parse(localStorage.getItem("weatherApp")) || []
    var buttonEle = ""
    for(let i = 0; i<dataLocal.length; i++) {
        buttonEle += `<button>${dataLocal[i]}</button>`
    }
    $("#prevCity").html(buttonEle)

}
displaylocalStorage()
//every time a cit name is typed, a button appears with city name that can be clicked again.

//save info to local storage

//save after reload

//weather conditions are displayed for city

//find how to get coordinates given city name

//temp, wind, humidity