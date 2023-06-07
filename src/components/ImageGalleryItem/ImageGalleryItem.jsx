import css from './imageGalleryItem.module.css';

function ImageGalleryItem({ data }) {
    return (
        <li className={css.item}> 
            <img
                className={css.image}
                src={data.webformatURL}
                alt={data.tags}>
            </img>
        </li>
    );
}

export default ImageGalleryItem;