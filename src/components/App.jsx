import React from 'react';
import { fetchImages } from './services/pixabay-api.js';
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
    largeImage: [],
  };

  fetchImages = async (userInput, page) => {
    try {
      const imagesData = await fetchImages(userInput, page);
      this.setState({ images: imagesData.hits, isLoading: false });
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ error: 'Failed to fetch images', isLoading: false });
    }
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentDidUpdate(prevProps, prevState) {
    window.removeEventListener('scroll', this.handleScroll);
    if (prevState.search !== this.state.search) {
      this.fetchImages(this.state.search, this.state.pageNumber);
    }
  }

  handleScroll = () => {
    const { isLoading, images, search, pageNumber } = this.state;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !isLoading &&
      images.length > 0
    ) {
      const nextPage = pageNumber + 1;
      this.fetchImages(search, nextPage);
    }
  };

  onSearch = search => {
    this.setState({ search, images: [], pageNumber: 1 });
  };

  findImage = () => {
    const largeImg = this.state.images.find(image => {
      return image.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = e => {
    this.setState({
      isModalOpen: true,
      largeImageId: Number(e.currentTarget.id),
    });
  };
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isLoading, images, isModalOpen, largeImageId } = this.state;

    return (
      <StyledContainer>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery openModal={this.openModal} images={images} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button fetchImages={this.handleScroll} />
        )}
        {isModalOpen && (
          <Modal
            largeImageId={largeImageId}
            onClose={this.closeModal}
            url={this.findImage() ? this.findImage().largeImageURL : ''}
            alt={this.findImage() ? this.findImage().tags : ''}
          >
            <img
              src={this.findImage() ? this.findImage().largeImageURL : ''}
              alt={this.findImage() ? this.findImage().tags : ''}
            />
          </Modal>
        )}
      </StyledContainer>
    );
  }
}
