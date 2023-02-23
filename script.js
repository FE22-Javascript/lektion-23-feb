const API_URL = "https://majazocom.github.io/Data/dogs.json";
let dogsArray = [];
const dogsContainerEL = document.querySelector('.dogs-container');
const searchBarEl = document.querySelector('#search-dog');
const dogOverlay = document.querySelector('.dog-overlay');
const prevDogBtn = document.querySelector('.pagination-btn--prev');
let currentDogIndex;

// pagination på hundkort

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
        dogCardEl.addEventListener('click', () => openDogOverlay(dog));
        dogsContainerEL.appendChild(dogCardEl);
    });
};

function openDogOverlay(dog) {
    console.log(dog.chipNumber);
    currentDogIndex = dogsArray.findIndex(d => d.chipNumber === dog.chipNumber);
    console.log('index of dog in list: ', currentDogIndex);
    document.querySelector('.dog-name').innerHTML = dog.name;
    dogOverlay.style.display = 'block';
};

// prev dog btn event listener
prevDogBtn.addEventListener('click', () => {
    openDogOverlay(dogsArray[currentDogIndex - 1]);
});

// search mechanics
searchBarEl.addEventListener('keyup', function () {
    let input = searchBarEl.value;
    let matches = [];
    // gå igenom listan med hundar och kolla om något namn inkluderar inputen
    dogsArray.forEach(dog => {
        // Om det inkluderar inputen skall vi lägga in hunden bland matchningarna
        if (dog.name.toLowerCase().includes(input.toLowerCase())) {
            matches.push(dog);
        }
    });
    if (matches.length > 0) {
        renderDogsToUI(matches);
    } else {
        //inga matchningar :(
        dogsContainerEL.innerHTML = "Inga matchningar hittades, var god sök igen."
    }
});