const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailContainer = document.querySelector(".recipe-content");
const closeBtn = document.querySelector(".closeBtn");

async function Food(query){
    try {
    recipeContainer.innerHTML = "<h1 class='message'>Fetching your favorite food from database...</h1>"
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    var data = await response.json()
    console.log(data);
    recipeContainer.innerHTML = "";

    data.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}"/>
        <h3> <span>${meal.strMeal} </span> </h3>
        <p> <span>${meal.strArea}<span> Dish</p>
        <p> Belongs to <span>${meal.strCategory} <span> category </p>
        `
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        button.classList.add("recipeButton")

        recipeDiv.appendChild(button)
        recipeContainer.appendChild(recipeDiv)


        button.addEventListener("click", () =>{
            openRecipePopup(meal)
        
        })
    });
} catch (error) {
    recipeContainer.innerHTML = "<h1 class='message'>Something went wrong!! <br> Please Try again...</h1>"
        
}

    
}

const fetchIngredient = (meal) =>{
    let ingredientList = "";
    for(let i=1; i<=20; i++){
     const ingredient = meal[`strIngredient${i}`];
     if(ingredient){
         const measure = meal[`strMeasure${i}`]
         ingredientList += `<li>    ${measure}  ${ingredient}</li>`
     }else{
         break;
     }
 
    }
    return ingredientList;
 }

const openRecipePopup = (meal) =>{
    recipeDetailContainer.innerHTML = `
    <h2 class="recipeName">${meal.strMeal} </h2>
    <h3>Ingredients:  </h3>

    <ul class="ingredientList">${fetchIngredient(meal)}</ul>
    
     <div class="instructions">
            <h2>Instructions: </h2>
            <p class="recipeInstructions">${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailContainer.parentElement.style.display = "block";

}
closeBtn.addEventListener("click", () =>{
    recipeDetailContainer.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    const search = searchBox.value.trim()
    if (!search) {
        recipeContainer.innerHTML = "<h1 class='message'>SearchBox is empty!!. Try again...</h1>";
        return;
    }
    Food(search)
    searchBox.value = ""
})