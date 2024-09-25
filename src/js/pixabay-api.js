const API_KEY = '46054358-74185f2755c78a9980c41a2df';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
    try {
        const response = await fetch(
            `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query.trim())}&image_type=photo&orientation=horizontal&safesearch=true`
        );
        if (!response.ok) {
            throw new Error('No images found.');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching images.');
    }
}

