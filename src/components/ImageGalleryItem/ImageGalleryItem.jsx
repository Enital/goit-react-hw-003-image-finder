import css from './imageGalleryItem.module.css';

function ImageGalleryItem({ data }) {
    return (
        <li className={css.imageGalleryItem}> 
            <img
                className={css.imageGalleryItemImage}
                src={data.webformatURL}
                alt={data.tags}>
            </img>
        </li>
    );
}

export default ImageGalleryItem;