import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Container } from './App.styled';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export default class App extends Component {
  state = {
    query: '',
    largeImgUrl: null,
    tag: null,
  };

  onSearchByQuery = query => {
    this.setState({ query: query });
  };

  onSetLargeImgUrl = (image, tag) => {
    this.setState({
      largeImgUrl: image,
      tag,
    });
  };

  onCloseModal = e => {
    this.setState({
      largeImgUrl: null,
    });
  };

  render() {
    const { query, largeImgUrl, tag } = this.state;
    return (
      <Container>
        <Searchbar searchByQuery={this.onSearchByQuery} />
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            duration: 2000,
          }}
        />
        <ImageGallery onSetLargeImgUrl={this.onSetLargeImgUrl} query={query} />
        {largeImgUrl && (
          <Modal url={largeImgUrl} tag={tag} onCloseModal={this.onCloseModal} />
        )}
      </Container>
    );
  }
}
