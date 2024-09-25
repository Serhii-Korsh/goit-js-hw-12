import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showNoResultsMessage, showErrorMessage, clearGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const inputField = form.querySelector('input');
const loader = document.querySelector('.loader'); 

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchQuery = inputField.value.trim();  // Get the trimmed value from the input field
    // const searchQuery = form.querySelector('input').value.trim();
    
    if (!searchQuery || searchQuery === '') {
        clearGallery(); // Clear the gallery if the search query is invalid
        showErrorMessage('The search field cannot be empty!');
        return;
    }

    loader.style.display = 'block'; 
    try {
        const data = await fetchImages(searchQuery);
        loader.style.display = 'none';
        
         // Очистить галерею перед добавлением новых изображений
        clearGallery();

        // Очистка поля ввода, независимо от того, успешен ли поиск
        inputField.value = ''; 

        if (data.hits.length === 0) {
            showNoResultsMessage();
        } else {
            renderGallery(data.hits);
        }
    } catch (error) {
        loader.style.display = 'none';
        clearGallery(); // Очистить галерею в случае ошибки
        showErrorMessage('The request failed. Please try again later.');
        inputField.value = '';  // Clear the input field in case of an error
    }
});



