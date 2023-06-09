import React from 'react';

import css from './searchBar.module.css';

class SearchBar extends React.Component {
  state = {
    inputValue: '',
  };

  handleInputChange = event => {
    const value = event.target.value;
    this.setState({ inputValue: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.inputValue);
  };
  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.form} onSubmit={this.handleFormSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            type="text"
            name="image"
            autoComplete="off"
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;