import React from 'react';
import {
  StyledSearchbar,
  SearchForm,
  SearchFormBtn,
  StyledSearchFormBtnLabel,
  StyledSearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends React.Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() !== '') {
      this.props.onSubmit(this.state.searchQuery);
      this.setState({ searchQuery: '' });
    }
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    return (
      <StyledSearchbar onSubmit={this.handleSubmit}>
        <SearchForm>
          <StyledSearchFormInput
            type="text"
            value={this.state.searchQuery}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </SearchForm>

        <SearchFormBtn type="submit" onClick={this.handleSubmit}>
          {' '}
          <StyledSearchFormBtnLabel>Search</StyledSearchFormBtnLabel>
        </SearchFormBtn>
      </StyledSearchbar>
    );
  }
}
