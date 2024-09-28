import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showNoResultsMessage, showErrorMessage, showEndOfResultsMessage, clearGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const inputField = form.querySelector('input');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

let page = 1;
let currentQuery = '';
let totalImages = 0;
let totalLoadedImages = 0; 

loadMoreButton.style.display = 'none';
loader.style.display = 'none';

function resetSearchState() {
    page = 1; 
    totalLoadedImages = 0; 
    totalImages = 0; 
    clearGallery(); 
    loadMoreButton.style.display = 'none'; 
    loadMoreButton.disabled = false; 
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchQuery = inputField.value.trim();

    if (!searchQuery || searchQuery === '') {
        clearGallery();
        inputField.value = '';
        loadMoreButton.style.display = 'none'; 
        showErrorMessage('The search field cannot be empty!');
        return;
    }

    resetSearchState(); 
    currentQuery = searchQuery; 

    loader.style.display = 'block'; 

    try {
        const data = await fetchImages(currentQuery, page);
        loader.style.display = 'none'; 

        if (data.hits.length === 0) {
            showNoResultsMessage();
        } else {
            renderGallery(data.hits);
            totalImages = data.totalHits; 
            totalLoadedImages += data.hits.length; 

            if (totalLoadedImages < totalImages) {
                loadMoreButton.style.display = 'block';
            } else {
                showEndOfResultsMessage(); 
            }
        }
    } catch (error) {
        loader.style.display = 'none';
        clearGallery();
        showErrorMessage('The request failed. Please try again later.');
    }
});

loadMoreButton.addEventListener('click', async () => {
    page += 1; 

    loader.style.display = 'block'; 
    loadMoreButton.disabled = true; 

    try {
        const data = await fetchImages(currentQuery, page);

        if (data.hits.length > 0) {
            renderGallery(data.hits);
            totalLoadedImages += data.hits.length; 

            smoothScroll();

            if (totalLoadedImages >= totalImages) {
                loadMoreButton.style.display = 'none';
                showEndOfResultsMessage();
            } else {
                loadMoreButton.disabled = false; 
            }
        }
    } catch (error) {
        loader.style.display = 'none';
        showErrorMessage('Failed to load more images. Please try again later.');
        loadMoreButton.disabled = false; 
    } finally {
        loader.style.display = 'none'; 
    }
});

function smoothScroll() {
    const gallery = document.querySelector('.gallery');
    const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}









