// import React from 'react';

// import css from './modal.module.css';

// class Modal extends React.Component {
//     state = {
//         showModal: true,
//     };

//     toggleModal = () => {
//         this.setState(({ showModal }) => ({
//             showModal: !showModal,
//         }));
//     };

//     componentDidMount() {
//         document.addEventListener('keydown', this.handleKeyDown);
//     }

//     componentWillUnmount() {
//         document.removeEventListener('keydown', this.handleKeyDown);
//     }
    
//     handleKeyDown = event => {
//         if (event.key === 'Escape') {
//         this.props.onClose();
//         }
//     };
    
//     // handleBackdrop = event => {
//     //     if (event.target === event.currentTarget) {
//     //         this.props.onClose();
//     //     }
//     // }
    
//     render() {
//         return (
//             this.state.showModal && (
//                 <div className={css.overlay} onClick={this.props.onClose}>
//                     <div className={css.modal}>
//                         <img src={this.props.image.largeImageURL} alt="" width={'80%'} />
//                     </div>
//                 </div>
//             )
//         );
//     }
// }

// export default Modal;

import { Component } from 'react';
import css from './modal.module.css';

export default class Modal extends Component {
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
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    return (
      this.state.showModal && (
        <div className={css.Overlay} onClick={this.props.onClose}>
          <div className={css.Modal}>
            <img src={this.props.image.largeImageURL} alt="" width={'90%'} />
          </div>
        </div>
      )
    );
  }
}