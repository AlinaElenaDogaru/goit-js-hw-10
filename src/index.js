"use strict";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';

import 'slim-select/dist/slimselect.css';


const selector = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");



document.addEventListener('DOMContentLoaded', () => {
    selector.style.display = 'none';
    loader.classList.remove('loader');
    loader.innerHTML = `
        <div>
            <span class="loader"></span>
            <span> Loading data, please wait...</span>
        </div>`;
    loader.style.display = 'flex';
    loader.style.fontSize = '25px';
    loader.style.fontWeight = '700';
    errorMessage.style.display = 'none';
    catInfo.style.display = 'none';

    fetchBreeds().then(response => {
        response.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            selector.appendChild(option);
        });
        selector.style.display = 'block';
        loader.style.display = 'none';

        const slimSelect = new SlimSelect({
          select: '.breed-select',
          placeholder: 'Select a breed',
          allowDeselect: true,
            alwaysOn: false,
          showSearch: true,
        });
        const slimContainer = document.querySelector('.ss-main');
        slimContainer.style.width = '20%';
        console.dir(slimContainer);
        
    }).catch(error => {
        loader.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Failed to load breeds. Please try again later.';
    });
});

selector.addEventListener("change", (event) => {
    const selectedBreedId = event.target.value;
    const catTarget = fetchCatByBreed(selectedBreedId);

    loader.style.display = 'block';
    catInfo.style.display = 'none';
    errorMessage.style.display = 'none';

    catTarget.then(response => {
        const cat = response.find(cat => cat.breeds[0].id === selectedBreedId);
        const markup = `
            <img src="${cat.url}" alt="Image of ${cat.breeds[0].name}" height="300">
            <div class="container">
                <h2 class="title">${cat.breeds[0].name}</h2>
                <p class="description">${cat.breeds[0].description}</p>
                <strong class="temperament">Temperament: </strong>${cat.breeds[0].temperament}
            </div>`;
        catInfo.style.display = 'flex';
        catInfo.style.gap = '10px';
        catInfo.style.paddingTop = '15px';
        catInfo.innerHTML = markup;
        loader.style.display = 'none';
    }).catch(error => {
        loader.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Failed to load cat information. Please try again later.';
    });
});