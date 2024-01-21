import { Component } from "react";
import { searchImages } from "../../api/images"
import ImageGallery from "components/ImageGallery/ImageGallery";
import Searchbar from "components/Searchbar/Searchbar";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";

import styles from "./image-finder.module.css"

class ImageFinder extends Component {
    state = {
        search: "",
        images: [],
        loading: false,
        error: null,
        page: 1,
        modalOpen: false,
        largeImage: "",
    }

    async componentDidUpdate(_, prevState) {
        const { search, page } = this.state;
        if (search && (search !== prevState.search || page !== prevState.page)) {
            this.fetchImages();
        }
    }

    async fetchImages() {
        const { search, page } = this.state;
        try {
            this.setState({
                loading: true,
            });
            const respImage = await searchImages(search, page);
            const { hits } = respImage.data;
            this.setState(({ images }) => ({
                images: hits?.length ? [...images, ...hits] : images,
            }))
        }
        catch (error) {
            this.setState({
                error: error.message
            })
        }
        finally {
            this.setState({
                loading: false,
            })
        }
    }

    handleSearch = ({ search }) => {
        this.setState({
            search,
            images: [],
            page: 1,
        })
    }

    loadMore = () => {
        this.setState(({ page }) => ({ page: page + 1 }));
    }

    showModal = ({largeImageURL}) => {
        this.setState({
            modalOpen: true,
            largeImage: largeImageURL,
        })
    }

    closeModal = ()=> {
        this.setState({
            modalOpen: false,
            largeImage: "",
        })
    }


    render() {
        const { handleSearch, loadMore, showModal, closeModal } = this;
        const { images, loading, error, modalOpen, largeImage } = this.state;
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
}

export default ImageFinder;