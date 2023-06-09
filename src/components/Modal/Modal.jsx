import React from 'react';
import PropTypes from 'prop-types';

import css from './modal.module.css';

export default class Modal extends React.Component {
  state = {
    showModal: true,
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape' && this.state.showModal===true) {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      // this.toggleModal();
      this.props.onClose();
    }
  };

  render() {

    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
        <img src={this.props.image.largeImageURL} alt=""/>
        </div>
      </div>
    );
  }
}

Modal.types = {
  image: PropTypes.object.isRequired,
  onModalClose: PropTypes.func.isRequired,
};