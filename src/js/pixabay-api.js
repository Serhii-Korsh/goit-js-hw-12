import axios from 'axios';

const API_KEY = '46054358-74185f2755c78a9980c41a2df';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: perPage,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching images.');
    }
}