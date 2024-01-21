import styles from "./image-gallery-item.module.css";

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, showModal }) =>
(<li key={id} onClick={() => showModal({ largeImageURL })} className={styles.item}>
    <img src={webformatURL} alt="" loading="lazy" className={styles.image} />    
</li>);

export default ImageGalleryItem;