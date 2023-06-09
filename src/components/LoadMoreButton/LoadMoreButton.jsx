// import React from 'react';

// import css from './loadMoreButton.module.css';

// function LoadMoreButton({ onClick }) {
//     return (
//         <button className={css.button} onClick={onClick}>
//             Load more
//         </button>
//     );
// }

// export default LoadMoreButton;

import React from 'react';
import css from './loadMoreButton.module.css';

function LoadMoreButton({ onClick }) {
  return (
    <button className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
}
export default LoadMoreButton;