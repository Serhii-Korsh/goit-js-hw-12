import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function renderGallery(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(image => `
        <div class="gallery-item">
            <div class="photo-card">
                <a href="${image.largeImageURL}" class="gallery-link">
                    <img width="360" height="152" src="${image.webformatURL}" class="photo-card-img" alt="${image.tags}" loading="lazy"/>
                </a>
                <div class="info">
                    <p><b>Likes</b> ${image.likes}</p>
                    <p><b>Views</b> ${image.views}</p>
                    <p><b>Comments</b> ${image.comments}</p>
                    <p><b>Downloads</b> ${image.downloads}</p>
                </div>
            </div>
        </div>
    `).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    
    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a');
    } else {
        lightbox.refresh();
    }
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}

export function showNoResultsMessage() {
    iziToast.warning({
        message: 'Sorry, there are no images matching <br>your search query. Please try again!',
        position: 'topRight',
        backgroundColor: 'red',
        class: 'toast-center',
        titleColor: 'white',
        title: 'ⓧ',
        titleSize: '22px',
        icon: "",
        messageColor: 'white',
        theme: 'dark',
    });
}

export function showErrorMessage(message) {
    iziToast.error({
        message,
        position: 'topRight',
        backgroundColor: 'red',
        class: 'toast-center',
        titleColor: 'white',
        title: 'ⓧ',
        titleSize: '22px',
        icon: "",
        messageColor: 'white',
        theme: 'dark',
    });
}

export function showEndOfResultsMessage() {
    iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: 'blue',
        class: 'toast-center',
        messageColor: 'white',
    });
}


