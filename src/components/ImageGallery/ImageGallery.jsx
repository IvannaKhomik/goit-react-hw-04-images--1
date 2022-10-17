import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { Gallery, Error } from './ImageGallery.styled';
import { Loader } from '../Loader';

import { getImages } from '../../requests';

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: '',
    load: false,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      this.setState({ status: 'pending', page: 1 });
      getImages(query)
        .then(res => this.onFirstTimeLoad(res.hits))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ load: true });
      getImages(query, page)
        .then(res => this.onLoadMoreImages(res.hits))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onFirstTimeLoad = data => {
    this.setState({
      images: data,
      status: 'resolved',
    });
  };

  onLoadMoreImages = data => {
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...data],
        status: 'resolved',
        load: false,
      };
    });
  };

  onClickLoadBtn = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, status, error, load, page } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <Error>{error.message}</Error>;
    }

    if (status === 'resolved') {
      const noResults = images.length === 0;
      const noMoreImages = images.length / (12 * page) < 1;
      return noResults ? (
        <Error> Sorry, we couldn't find a match for your search.</Error>
      ) : (
        <>
          <Gallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={webformatURL}
                tags={tags}
                onSetLargeImgUrl={() =>
                  this.props.onSetLargeImgUrl(largeImageURL, tags)
                }
              />
            ))}
          </Gallery>
          {load && <Loader />}
          {!noMoreImages && <Button onClickLoadBtn={this.onClickLoadBtn} />}
        </>
      );
    }
  }
}
