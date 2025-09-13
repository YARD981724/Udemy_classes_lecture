const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const weatherIcon = document.querySelector(".wIcon");

const apiKey = "c5d1649f67819237f3f71d011c8ff47d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const getWeather = async (city) =>{
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == "404") {
        document.querySelector(".ram").style.display = "none";
        document.querySelector(".error").style.display = "block";
        
    }else{
        var data = await response.json();
        console.log(data);

        if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear-sky.png"
        }else if(data.weather[0].main =="Clouds"){
            weatherIcon.src = "images/cloud.png";
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/heavy-rain.png";
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }else if(data.weather[0] == "Snow"){
            weatherIcon.src = "images/cloudy.png";
        }else{
            // something happened wrong
        }

        function timeFormat(timeStamp){
            const date = new Date(timeStamp * 1000);
            let hours = date.getHours();
            let minutes = date.getMinutes().toString().padStart(2, "0");
            let seconds = date.getSeconds().toString().padStart(2, "0");
            let ampm = hours>=12?"PM":"AM";

            hours = hours % 12;
            hours = hours?hours:12
            return `${hours}:${minutes}:${seconds}${ampm}`
        }
        if (data.sys) {
            document.querySelector(".sunrise").innerHTML = timeFormat(data.sys.sunrise);
            document.querySelector(".sunset").innerHTML = timeFormat(data.sys.sunset)
        }
        document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) +"%";
        document.querySelector(".windSpeed").innerHTML = Math.round(data.wind.speed) +"Km/h";
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".haze").innerHTML = data.weather[0].main
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C"       
        

    document.querySelector(".ram").style.display = "block";
    document.querySelector(".error").style.display = "none";


    }
    
}

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const search = searchBox.value.trim();
    if (!search) {
        document.querySelector(".error").parentElement.style.display = "block";
        // document.querySelector(".ram").parentElement.style.display = "none";
        return;
    }
    getWeather(search)
    searchBox.value = "";
})