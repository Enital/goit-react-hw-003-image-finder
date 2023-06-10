import React from 'react';
import PropTypes from 'prop-types';

import css from './loadMoreButton.module.css';

function LoadMoreButton({ onClick }) {
  return (
    <button className={css.button} onClick={onClick}>
      Load more
    </button>
  );
}
export default LoadMoreButton;

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}