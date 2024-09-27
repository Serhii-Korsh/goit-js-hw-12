import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showNoResultsMessage, showErrorMessage, showEndOfResultsMessage, clearGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const inputField = form.querySelector('input');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
let page = 1;
let currentQuery = '';
let totalImages = 0;

loadMoreButton.style.display = 'none';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const searchQuery = inputField.value.trim();
    if (!searchQuery || searchQuery === '') {
        clearGallery();
        loadMoreButton.style.display = 'none';
        showErrorMessage('The search field cannot be empty!');
        inputField.value = '';
        return;
    }

    loader.style.display = 'block';
    loadMoreButton.style.display = 'none'; 
    page = 1; 
    currentQuery = searchQuery;

    try {
        const data = await fetchImages(currentQuery, page);
        loader.style.display = 'none';

        clearGallery();
        inputField.value = '';

        if (data.hits.length === 0) {
            showNoResultsMessage();
        } else {
            renderGallery(data.hits);
            totalImages = data.totalHits;
            if (page * 15 < totalImages) {
                loadMoreButton.style.display = 'block'; 
            }
        }
    } catch (error) {
        loader.style.display = 'none';
        clearGallery();
        showErrorMessage('The request failed. Please try again later.');
        inputField.value = '';
    }
});

loadMoreButton.addEventListener('click', async () => {
    page += 1;
    loader.style.display = 'block';

    try {
        const data = await fetchImages(currentQuery, page);
        loader.style.display = 'none';

        if (data.hits.length === 0 || page * 15 >= totalImages) {
            loadMoreButton.style.display = 'none'; 
            showEndOfResultsMessage();
        } else {
            renderGallery(data.hits);
            smoothScroll();
        }
    } catch (error) {
        loader.style.display = 'none';
        showErrorMessage('Failed to load more images. Please try again later.');
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


