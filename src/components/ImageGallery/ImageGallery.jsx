import React from 'react';

import { StyledImageGallery } from './ImageGallary.styled.js';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <StyledImageGallery>
      {images.map((image, index) => (
        <ImageGalleryItem
          openModal={openModal}
          key={`${image.id}-${index}`}
          image={image}
        />
      ))}
    </StyledImageGallery>
  );
};
