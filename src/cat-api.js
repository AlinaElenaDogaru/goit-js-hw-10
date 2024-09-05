"use strict";

import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "live_xAiL3m7jAqtmwiInR2aEpAhAA3SaEXX5ZhGYjvQjR5StciICC0kTyezXjnxBrfec";

export async function fetchBreeds() {
    try {
        const catBreeds = await axios.get("https://api.thecatapi.com/v1/breeds"); 
        return catBreeds.data;
    } catch (error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
}

export async function fetchCatByBreed(breedId) {
    try {
        const descriptionOfTheBreed = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        return descriptionOfTheBreed.data;
    } catch (error) {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
}