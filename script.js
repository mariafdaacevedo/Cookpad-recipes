addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
/*------------- */  
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

/*Event Listeners */
//1. Evento boton buscar- arroja lista de comidas relacionadas con la busqueda
searchBtn.addEventListener('click',getMealList);

    //Funcion getMealList
    function getMealList(){
        let searchInputTxt = document.getElementById('search-input').value.trim();
        console.log(searchInputTxt.length);
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html="";
            if(data.meals){
                data.meals.forEach(meal => {
                    html += `
                    <div class="card meal-item" data-id = "${meal.idMeal}">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="food">
                    <div class="card-body meal-name">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <a href="#" class="btn btn-primary recipe-btn">Get recipe</a>
                    </div>
                  </div>
                    `;
                });
                mealList.classList.remove("notFound");
            }else{
                html = "Sorry, we didn't find any meal for your ingredient! <br> Let's try again. "
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
            
        });

    }
//2. Evento click que muestra la receta 
//const mealList = document.getElementById('meal');
mealList.addEventListener('click', getMealRecipe);

    //funcion getMealRecipe
    function getMealRecipe(e){ // e es una objetoque contiene informaicon del evento que acaba de suceder
        e.preventDefault();
        if(e.target.classList.contains('recipe-btn')){
            let mealItem = e.target.parentElement.parentElement; //estamos diciendo que mealItem va corresponder a div class="card meal-item el abuelo del boton get recipe
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));

        }
    }

    //funcion mealRecipeModal - creacion del modal
        function mealRecipeModal(meal){
            console.log(meal);
            meal = meal[0];
            let html = `
            <h2 class="recipe-title">${meal.strMeal}</h2>
            <p class="recipe-category">${meal.strCategory}</p>
            <div class="recipe-instruct">
              <h3>Steps:</h3>
              <p>${meal.strInstructions}</p>
            </div>
            <div class="recipe-meal-img">
              <img src="${meal.strMealThumb}" alt="" >
            </div>
            <div class="recipe-link">
              <a href="${meal.strYoutube}" target="_blank" >Watch Video</a>
            </div>
            `;
            mealDetailsContent.innerHTML = html;
            mealDetailsContent.parentElement.classList.add('showRecipe');
        }

    //3. boton de cerrar el modal
        //const recipeCloseBtn = document.querySelector('.recipe-close-btn');
    
    recipeCloseBtn.addEventListener('click', () => {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
    });







/*------------- */   
});
 