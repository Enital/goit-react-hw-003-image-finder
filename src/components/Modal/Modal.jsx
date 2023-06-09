import React from 'react';
import css from './modal.module.css';

export default class Modal extends React.Component {
  state = {
    showModal: true,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape' && this.state.showModal===true) {
      this.toggleModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.toggleModal();
    }
  };

  render() {

    return (
      this.state.showModal && (
        <div className={css.overlay} onClick={this.handleBackdropClick}>
          <div className={css.modal}>
            <img src={this.props.image.largeImageURL} alt="" width={'90%'} />
          </div>
        </div>
      )
    );
  }
}