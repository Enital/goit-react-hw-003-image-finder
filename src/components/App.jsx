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
    showMoreButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
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
      const showMoreButton = page < Math.ceil(total / 12);
      this.setState({ images: [...this.state.images, ...images],
        showMoreButton });
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
    const { images, load, showMoreButton} = this.state;

    return (
      <div>
        <SearchBar onFormSubmit={this.handleFormSubmit}></SearchBar>
          <ImageGallery
            load={load}
            images={images}
            onClick={this.nextPage}
          ></ImageGallery>

          {showMoreButton &&<LoadMoreButton onClick={this.nextPage} />}
      </div>
    );
  }
}

export default App;