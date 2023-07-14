const THE_DOG_API = "https://api.thedogapi.com/v1/images/search?limit=4";

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


    } catch (error) {

        const errorGetingRandomDogs = document.querySelector(".error-span");
        errorGetingRandomDogs.textContent = `Error ${error.message}`;
        throw new Error ("There was an error getting Random Dogs");

    }
  
};

getRandomDogs();