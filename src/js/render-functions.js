import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
    const gallery = document.querySelector('.gallery');
  

    images.forEach(image => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `
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
        `;
        gallery.appendChild(item);
    });
    
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

// Функция для очистки галереи
export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}


export function showNoResultsMessage() {
    iziToast.warning({
        message: 'Sorry, there are no images matching <br>your search query. Please try again!',
        position: 'topRight',
        titleColor: 'white',
        title: 'ⓧ',
        titleSize: '22px',
        backgroundColor: "red",
        icon: "",
        messageColor: 'white',
        theme: 'dark',
        class: 'toast-center',
    });
    
}

export function showErrorMessage(message) {
    iziToast.error({
        title: 'Err',
        message: message,
        position: 'topRight',
        titleColor: 'white',
        title: 'ⓧ',
        titleSize: '22px',
        backgroundColor: "red",
        icon: "",
        messageColor: 'white',
        theme: 'dark',
    });
}

