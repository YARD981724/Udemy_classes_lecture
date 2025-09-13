const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const bodyContainer = document.querySelector(".content");

const apiKey = "bd2ae01"

async function fetchMovie(query){
    try {
        bodyContainer.innerHTML = "<h1 class='message'>Fetching movie from database</h1>"
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${query}`);
    var data = await response.json();
    console.log(data);
    bodyContainer.innerHTML = ""



    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movieName");
        movieDiv.innerHTML = `
        <img src="${data.Poster}"/>
        `
      
    const movieContent = document.createElement("div");
    movieContent.classList.add("rate");
    movieContent.innerHTML = `
    <h1> Movie Name:  <span> ${data.Title}</span></h1>
    <h3>Rating:  <span>${data.Ratings[0].Value}</span></h3>  <br/>
    <li> <b>Released</b>:  <span>${data.Released}</span></li><br/> 
    <li> <b>Durations</b>: <span>${data.Runtime}</span></li> <br/>
    <li> <b>Actors</b>: <span>${data.Actors}</span></li> <br/>
    <li> <b>Country</b>: <span>${data.Country}</span></li> <br/>
    <li> <b>Language</b>: <span>${data.Language}</span></li> <br/>
    <li> <b>Genre</b>: <span>${data.Genre}</span></li> <br/>
    <li> <b>BoxOffice</b>: <span>${data.BoxOffice}</span></p> <br/>
    <li> <b>Descriptions</b>: <span>${data.Plot}</span></p> <br/>

    
    `
   
    const button = document.createElement("button");
    button.textContent = "Play the Movie";
    button.classList.add("play")
    movieContent.appendChild(button)
    bodyContainer.appendChild(movieDiv)
    bodyContainer.appendChild(movieContent)


} catch (error) {
        bodyContainer.innerHTML = "<h1 class='message'>Something went wrong, Try again!!</h1>";
}
}

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const search = searchBox.value.trim();
    if (!search) {
        bodyContainer.innerHTML = "<h1 class='message'>Something went wrong, Try again!!</h1>";
        return;
    }
    
    fetchMovie(search)
    searchBox.value = ""
})