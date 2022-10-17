import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';

import { Header, SearchForm, SearchBtn, SearchField } from './Searchbar.styled';

const INITIAL_STATE = {
  query: '',
};
export default class Searchbar extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value.toLowerCase() });
  };

  onSubmitBtn = e => {
    e.preventDefault();
    const { query } = this.state;
    if (query.trim() === '') {
      return toast.error('Please, type the title of image you want to find');
    }
    this.props.searchByQuery(query);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Header>
          <SearchForm onSubmit={this.onSubmitBtn}>
            <SearchBtn type="submit">
              <BsSearch />
            </SearchBtn>

            <SearchField
              onChange={this.onInputChange}
              value={query}
              type="text"
              autocomplete="off"
              placeholder="Search images and photos"
            />
          </SearchForm>
        </Header>
      </>
    );
  }
}
