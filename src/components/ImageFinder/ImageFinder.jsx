import { useState, useEffect } from "react";
import { searchImages } from "../../api/images"
import ImageGallery from "components/ImageGallery/ImageGallery";
import Searchbar from "components/Searchbar/Searchbar";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";

import styles from "./image-finder.module.css";

const ImageFinder = () => {
    const [search, setSearch] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [largeImage, setLargeImage] = useState({});

    useEffect(() => {
        const fetchImages = async() => {
            try {
                setLoading(true);
                const respImage = await searchImages(search, page);
                const { hits } = respImage.data;
                setImages(prevImages => hits?.length ? [...prevImages, ...hits] : prevImages)
            }

            catch (error) {
                setError(error.message);
            }

            finally {
                setLoading(false);
            }
        }

        if(search) {
            fetchImages();
        }
    }, [search, page])

    const handleSearch = ({ search }) => {
        setSearch(search);
        setImages([]);
        setPage(1);
    }

    const loadMore = () => setPage(prevPage => prevPage + 1);

    const showModal = ({ largeImageURL }) => {
        setModalOpen(true);
        setLargeImage({
            largeImage: largeImageURL,
        })
    }

    const closeModal = () => {
        setModalOpen(false);
        setLargeImage({});
    }

    const isImages = Boolean(images.length);
    const isMoreImages = Boolean(images.length % 12 === 0);

        return (
            <>
                <Searchbar onSubmit={handleSearch} />   
                {error && <p className={styles.error}>{error}</p>}
                {loading && <Loader />}
                {isImages && <ImageGallery showModal={showModal} items={images} />}
                {isImages && isMoreImages && <div className={styles.loadMoreWrapper}>
                    <Button onClick={loadMore} type="button">Load more</Button></div>}
                {modalOpen && <Modal largeImage={largeImage} close={closeModal}><img src={largeImage} alt="" className={styles.img} /></Modal>}
            
            </>
        )

}

export default ImageFinder;