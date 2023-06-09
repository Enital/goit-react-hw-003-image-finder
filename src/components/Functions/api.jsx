import axios from 'axios'

export async function api(query, page) {
    const KEY = '35660997-4fd052661528ba3040eb8e5ad';
    const BASEURL = `https://pixabay.com/api/?key=${KEY}&q=`;

    const { data } = await axios.get(
            `${BASEURL}${query.trim()}&image_type=photo&pretty=true&orientation=horizontal&safesearch=true&webformatURL=180&per_page=12&page=${page}`
        );
    return data;
}