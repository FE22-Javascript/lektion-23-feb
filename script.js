const API_URL = "https://majazocom.github.io/Data/dogs.json";
let dogsArray = [];
const dogsContainerEL = document.querySelector('.dogs-container');
const searchBarEl = document.querySelector('#search-dog');

async function fetchDogs() {
    try {
    // fetch the dogs and add to UI
    let response = await fetch(API_URL);
    dogsArray = await response.json();
    renderDogsToUI(dogsArray)
    }
    catch (error) {
        console.log(error);
    }
}

fetchDogs();

function renderDogsToUI(dogs) {
    dogsContainerEL.innerHTML = "";
    dogs.forEach(dog => {
        let dogCardEl = document.createElement('article');
        dogCardEl.innerHTML = `<p>${dog.name}</p>`;
        dogCardEl.addEventListener('click', function() {
            console.log(dog);
        });
        dogsContainerEL.appendChild(dogCardEl);
    });
};

// search mechanics
searchBarEl.addEventListener('keyup', function() {
    let input = searchBarEl.value;
    let matches = [];
    // gå igenom listan med hundar och kolla om något namn inkluderar inputen
    dogsArray.forEach(dog => {
        // Om det inkluderar inputen skall vi lägga in hunden bland matchningarna
        if (dog.name.toLowerCase().includes(input.toLowerCase())) {
            matches.push(dog);
        }
    });
    renderDogsToUI(matches);
});