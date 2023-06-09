import css from './imageGalleryItem.module.css';

function ImageGalleryItem({ oneImage }) {
  return (
    <img
      className={css.image}
      src={oneImage.webformatURL}
      alt={oneImage.tags}
    ></img>
  );
}
export default ImageGalleryItem;