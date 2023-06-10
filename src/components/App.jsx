import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import { api } from './Functions/api';

import './app.module.css';

class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    load: false,
    howManyImagesFound: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      // || prevState.page !== page
      this.getApiData();
    }
  }

  async getApiData() {
    const {query, page }= this.state;
    this.setState({ load: true });
    try {
      const response = await api(query, page);
      
      const { hits: images, totalHits: total } = response;

      if (images.length === 0) {
        alert('Nothing found =`(');
        return;
      }
      
      this.setState({ images: [...this.state.images, ...images],
        howManyImagesFound: total,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ load: false });
    }
  }

  handleInputChange = value => {
    this.setState({ query: value });
  };

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = value => {
    value && this.setState({ images: [], query: value, page: 1 });
  };

  render() {
    const { images, load } = this.state;

    return (
      <div>
        <SearchBar onFormSubmit={this.handleFormSubmit}></SearchBar>
          <ImageGallery
            load={load}
            images={images}
            onClick={this.nextPage}
          ></ImageGallery>

          {this.state.images &&
          this.state.howManyImagesFound - this.state.images.length > 12 ? (
            <LoadMoreButton onClick={this.nextPage}></LoadMoreButton>
          ) : (
            ''
        )}
      </div>
    );
  }
}

export default App;