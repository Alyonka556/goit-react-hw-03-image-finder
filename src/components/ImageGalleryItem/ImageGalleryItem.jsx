import React from 'react';

import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled.js';

export const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, tags, id } = image;

  const handleImageClick = () => {
    openModal(webformatURL, id);
  };

  return (
    <StyledImageGalleryItem onClick={handleImageClick}>
      <StyledImageGalleryItemImg src={webformatURL} alt={tags} />
    </StyledImageGalleryItem>
  );
};
