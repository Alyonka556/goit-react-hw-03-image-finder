import React from 'react';

import { StyledButton } from './Button.styled.js';

export const Button = ({ loadMoreImages }) => (
  <StyledButton type="button" onClick={loadMoreImages}>
    Load more...
  </StyledButton>
);
