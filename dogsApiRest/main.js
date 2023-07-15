const THE_DOG_API = "https://api.thedogapi.com/v1/images/search?limit=4";
const THE_FAVORITES = "https://api.thedogapi.com/v1/favourites";

async function getRandomDogs () {

    try {

        const response = await fetch(`${THE_DOG_API}`);

        const statusName = response.status;
        console.log(statusName);
        if (statusName!== 200) {
            throw new Error(`Error Status ${statusName}`);
        };

        const data = await response.json();
    
        console.log("These are the random dogs");
        console.log(data);
    
        const dogImage1 = document.querySelector(".random-image1");
        const dogImage2 = document.querySelector(".random-image2");
        const dogImage3 = document.querySelector(".random-image3");
        const dogImage4 = document.querySelector(".random-image4");
        dogImage1.src = data[0].url;
        dogImage2.src = data[1].url;
        dogImage3.src = data[2].url;
        dogImage4.src = data[3].url;
    
        const getRandomButton = document.querySelector("#random-button");
        getRandomButton.addEventListener('click', getRandomDogs);

        const saveToFavoritesButton1 = document.querySelector(".save-random-button1");
        const saveToFavoritesButton2 = document.querySelector(".save-random-button2");
        const saveToFavoritesButton3 = document.querySelector(".save-random-button3");
        const saveToFavoritesButton4 = document.querySelector(".save-random-button4");
        saveToFavoritesButton1.onclick = () => postingFavoritesDogs(data[0].id);
        saveToFavoritesButton2.onclick = () => postingFavoritesDogs(data[1].id);
        saveToFavoritesButton3.onclick = () => postingFavoritesDogs(data[2].id);
        saveToFavoritesButton4.onclick = () => postingFavoritesDogs(data[3].id);

    } catch (error) {

        const errorGetingRandomDogs = document.querySelector(".error-span");
        errorGetingRandomDogs.textContent = `Error ${error.message}`;
        throw new Error ("There was an error getting Random Dogs");

    }
  
};


async function readingFavoritesDogs () {
    const response = await fetch (`${THE_FAVORITES}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_imFX3wCXMSiiT5grtBIzq2NKnjjOSqkAUFB02DRHoqYeCNuK65JgQgc2DsTNbDtc",
        }
    });
    const data = await response.json();
    console.log("This is the favorite dog");
    console.log(data);

    const favoritesDogs = document.querySelector(".favorites-horizontal-container");
    favoritesDogs.className = "favorites-horizontal-container";
    const firstlyEmptyList = [];
    favoritesDogs.innerHTML = "";

    data.forEach(favoritesData => {

        const scrollContent = document.createElement("section");
        scrollContent.className = "scroll-content";
        const favoriteArticle = document.createElement("article");
        favoriteArticle.className = "favorite-article";
        const favoriteImageContainer = document.createElement("section");
        favoriteImageContainer.className = "favorite-image-container";
        const imageFavorite = document.createElement("img");
        imageFavorite.src = favoritesData.image.url;
        imageFavorite.className = "favorite-image";
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-favorite-button";
        deleteButton.textContent = "Delete from favorites";
        
        favoriteImageContainer.appendChild(imageFavorite);
        favoriteImageContainer.appendChild(deleteButton);
        favoriteArticle.appendChild(favoriteImageContainer)
        scrollContent.appendChild(favoriteArticle);

        firstlyEmptyList.push(scrollContent);

    })

    favoritesDogs.append(...firstlyEmptyList);
}


async function postingFavoritesDogs (id) {
    const response = await fetch (`${THE_FAVORITES}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_imFX3wCXMSiiT5grtBIzq2NKnjjOSqkAUFB02DRHoqYeCNuK65JgQgc2DsTNbDtc",
        },
        body: JSON.stringify({
            image_id: `${id}`, 
        }),

    });
    const data = await response.json();
    console.log("This is posting to a favorites");
    console.log(data);

    readingFavoritesDogs();

}


getRandomDogs();
readingFavoritesDogs()