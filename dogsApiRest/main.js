const THE_DOG_API = "https://api.thedogapi.com/v1/images/search?limit=4";
const THE_FAVORITES = "https://api.thedogapi.com/v1/favourites";

async function getRandomDogs () {

    try {

        const response = await fetch(`${THE_DOG_API}`);

        const statusName = response.status;
        console.log(statusName);
        if (statusName!== 200) {
            throw new Error(`Error fetching "getRandomDogs": ${statusName}`);
        };

        const data = await response.json();
    
        console.log("These are the random dogs");
        console.log(data);

        //This structure is already done in the html//
    
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

        //This part is done after making readingFavoritesDogs and postingFavoritesDogs to add functionality to its buttons//

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
        throw new Error ("There was an error Getting Random Dogs");

    }
  
};

//This function is by documentation, only to read favorites. Then, after making others functions, save favorites//

async function readingFavoritesDogs () {

    try {

        const response = await fetch (`${THE_FAVORITES}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "live_imFX3wCXMSiiT5grtBIzq2NKnjjOSqkAUFB02DRHoqYeCNuK65JgQgc2DsTNbDtc",
            }
        });

        const statusName = response.status;
        if (statusName !== 200) {
            throw new Error (`Error fetching "readingFavoritesDogs": ${statusName}`);
        };

        const data = await response.json();
        console.log("This is the favorite dog");
        console.log(data);
    
        //This container is the only element in the html//
    
        const favoritesDogs = document.querySelector(".favorites-horizontal-container");
        favoritesDogs.className = "favorites-horizontal-container";
    
        //This is to acomadate the future coming images//
    
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

    } catch (error) {

        const errorReadingFavoritesDogs = document.querySelector(".error-span2");
        errorReadingFavoritesDogs.textContent = `Error ${error.message}`;
        throw new Error ("There was an error Reading Random Dogs");

    }

}

//This function is to finally post the favorites. And is called from the above buttons as required//

async function postingFavoritesDogs (id) {

    try {

        const response = await fetch (`${THE_FAVORITES}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "live_imFX3wCXMSiiT5grtBIzq2NKnjjOSqkAUFB02DRHoqYeCNuK65JgQgc2DsTNbDtc",
            },
            body: JSON.stringify({  //Check this beacause I would do it differentely//
                image_id: `${id}`, 
            }),
        });

        const statusName = response.status;
        if (statusName !== 200) {
            throw new Error (`Error fetching "postingFavoritesDogs": ${statusName}`);
        };

        const data = await response.json();
        console.log("This is posting to a favorites");
        console.log(data);
    
        //Calling readingFavoritesDogs -- check this//
    
        readingFavoritesDogs();

    } catch (error) {

        const errorPostingFavoritesDogs = document.querySelector(".error-span3");
        errorPostingFavoritesDogs.textContent = `Error ${error.message}`;
        throw new Error ("There was an error Posting Favorite Dogs");

    }

}

//Call getRandomDogs to always charge the images when open the application//

getRandomDogs();

//Call readingFavoritesDogs to always charge the favorites when open the application//

readingFavoritesDogs()