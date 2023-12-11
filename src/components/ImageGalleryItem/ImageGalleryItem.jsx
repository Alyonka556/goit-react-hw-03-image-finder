import React from 'react';

import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled.js';

export const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, largeImageURL, tags } = image;

  const handleImageClick = () => {
    openModal(largeImageURL);
  };

  return (
    <StyledImageGalleryItem onClick={handleImageClick}>
      <StyledImageGalleryItemImg src={webformatURL} alt={tags} />
    </StyledImageGalleryItem>
  );
};
