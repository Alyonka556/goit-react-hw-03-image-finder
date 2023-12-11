import React from 'react';
import { fetchImages } from '../services/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader.jsx';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import 'styles.css';

import { StyledContainer } from './App.styled.js';

export class App extends React.Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    images: [],
    pageNumber: 1,
    search: '',
    error: '',
    isLoading: false,
    isModalOpen: false,
    largeImageId: null,
    largeImage: null,
  };

  fetchImages = async (userInput, page) => {
    try {
      this.setState({ isLoading: true });
      const imagesData = await fetchImages(userInput, page);
      const uniqueNewImages = imagesData.hits.filter(
        image =>
          !this.state.images.some(
            existingImage => existingImage.id === image.id
          )
      );

      if (uniqueNewImages.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...uniqueNewImages],
          isLoading: false,
        }));
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ error: 'Failed to fetch images', isLoading: false });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      this.fetchImages(this.state.search, this.state.pageNumber);
    }
  }

  loadMoreImages = () => {
    const nextPage = this.state.pageNumber + 1;
    this.setState({ pageNumber: nextPage });
  };

  onSearch = search => {
    this.setState({ search, images: [], pageNumber: 1 });
  };

  openModal = largeImage => {
    this.setState({
      isModalOpen: true,
      largeImage,
    });
  };

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isLoading, images, isModalOpen, largeImage } = this.state;
    const hasMoreImages = images.length > 0 && !isLoading;

    return (
      <StyledContainer>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery openModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        {hasMoreImages && <Button loadMoreImages={this.loadMoreImages} />}
        {isModalOpen && <Modal url={largeImage} onClose={this.closeModal} />}
      </StyledContainer>
    );
  }
}
