let currentIndex = 0;
let recipes = [];

// Fonction pour créer une carte de recette
function createCard(recipe) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <h2>${recipe.name}</h2>
        <p>Calories: ${recipe.calories}</p>
        <div class="nutrition-info">
            <p>Protéines: ${recipe.protein}g</p>
            <p>Glucides: ${recipe.carbs}g</p>
            <p>Lipides: ${recipe.fat}g</p>
        </div>
        <button class="like-button" onclick="likeRecipe(this)">J'aime</button>
    `;
    
    return card;
}

// Fonction pour aimer une recette
function likeRecipe(button) {
    button.innerText = button.innerText === "J'aime" ? "Aimé" : "J'aime";
}

// Fonction pour charger les recettes depuis l'API
function loadMoreRecipes() {
    const container = document.getElementById('recipe-container');

    // Vérifiez si les recettes sont déjà chargées
    if (recipes.length === 0) {
        fetch('http://localhost:3000/api/recipes')
            .then(response => response.json())
            .then(data => {
                recipes = data; // Stockez les recettes récupérées
                displayRecipes(container);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des recettes :', error);
            });
    } else {
        displayRecipes(container);
    }
}

// Fonction pour afficher les recettes dans le conteneur
function displayRecipes(container) {
    for (let i = 0; i < 3; i++) {
        if (currentIndex < recipes.length) {
            const card = createCard(recipes[currentIndex]);
            container.appendChild(card);
            currentIndex++;
        }
    }
}

// Événement de défilement infini
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreRecipes();
    }
});

// Charger les recettes initiales
loadMoreRecipes();