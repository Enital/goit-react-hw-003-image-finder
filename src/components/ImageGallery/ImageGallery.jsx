import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from '../Modal/Modal';

import css from './imageGallery.module.css';

class ImageGallery extends React.Component {
    state = {
        selectedImage: null,
    };
    
    handleImageClick = image => {
        this.setState({ selectedImage: image });
        document.addEventListener('keydown', this.handleKeyDown);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({ load: true });
        }
    }

    handleModalClose = () => {
        this.setState({ selectedImage: null });
    };

    render() {
        const { images, load } = this.props;
        const { selectedImage } = this.state;
        return (
            <>
                <ul className={css.gallery}>
                    {images &&
                        images.map(image => {
                            return (                             
                                <ImageGalleryItem key={image.id} data={image} onClick={() => this.handleImageClick(image)}></ImageGalleryItem>
                            );
                        })}
                </ul>
                {selectedImage && (
                    <Modal image={selectedImage} onClose={this.handleModalClose}></Modal>
                )}
                {load && <Loader />}
            </>
        );
    }
}

export default ImageGallery;