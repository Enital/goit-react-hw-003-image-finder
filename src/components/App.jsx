import { Component } from 'react';
import React from 'react';
import './app.module.css';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';

const KEY = '35660997-4fd052661528ba3040eb8e5ad';
const BASEURL = `https://pixabay.com/api/?key=${KEY}&q=`;

class App extends Component {
  state = {
    images: null,
    query: '',
    page: 1,
    load: false,
    howManyImagesFound: null,
  };

  // componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: null });
      this.getApiData();
    } else {
      return false;
    }
  }

  async getApiData() {
    const {query}= this.state;
    this.setState({ load: true });
    try {
      const response = await axios.get(
        `${BASEURL}${query.trim()}&image_type=photo&pretty=true&orientation=horizontal&safesearch=true&webformatURL=180&per_page=12&page=${
          this.state.page
        }`
      );
      const newImages = response.data.hits;

      if (response.data.hits.length === 0) {
        alert('Nothing found =`(');
      }
      this.setState(prevState => ({
        images: prevState.images
          ? [...prevState.images, ...newImages]
          : newImages,
        howManyImagesFound: response.data.totalHits,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        load: false,
      });
    }
  }

  handleInputChange = value => {
    this.setState({ query: value });
  };

  nextPage = async () => {
    this.setState(prevState => ({ load: true, page: prevState.page + 1 }));

    try {
      const response = await axios.get(
        `${BASEURL}${this.state.query.trim()}&image_type=photo&pretty=true&orientation=horizontal&safesearch=true&webformatURL=180&per_page=12&page=${
          this.state.page + 1
        }`
      );
      const newImages = response.data.hits;
      this.setState(prevState => ({
        images: prevState.images
          ? [...prevState.images, ...newImages]
          : newImages,
        howManyImagesFound: response.data.totalHits,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        load: false,
      });
    }
  };

  handleFormSubmit = value => {
    value && this.setState({ query: value, page: 1 });
  };

  render() {
    const { images, load } = this.state;

    return (
      <div>
        <SearchBar onFormSubmit={this.handleFormSubmit}></SearchBar>
        <main>
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
        </main>
      </div>
    );
  }
}

export default App;