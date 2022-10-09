import React from 'react';
import { Container, Logo } from './Pagination.styled';

import paginLeft from '../../../assets/img/Pagin/vectorLeft.svg';
import paginRight from '../../../assets/img/Pagin/vectorRight.svg';

interface PaginationProps {
  pageUp: () => void;
  pageDown: () => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageUp, pageDown, currentPage }) => {
  return (
    <Container>
      <Logo src={paginLeft} width='7px' onClick={pageDown} pointer />
      <div>{currentPage}</div>
      <Logo src={paginRight} width='7px' onClick={pageUp} pointer />
    </Container>
  );
};

export default Pagination;
