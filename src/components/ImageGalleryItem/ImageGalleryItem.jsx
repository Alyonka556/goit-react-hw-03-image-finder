import React from 'react';

import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled.js';

export const ImageGalleryItem = ({ image, openModal }) => {
  const { webformatURL, tags } = image;

  return (
    <StyledImageGalleryItem id={image.id} onClick={openModal}>
      <StyledImageGalleryItemImg src={webformatURL} alt={tags} />
    </StyledImageGalleryItem>
  );
};
