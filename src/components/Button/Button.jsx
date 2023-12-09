import React from 'react';

import { StyledButton } from './Button.styled.js';

export const Button = ({ fetchImages }) => (
  <StyledButton type="button" onClick={fetchImages}>
    Load more...
  </StyledButton>
);
