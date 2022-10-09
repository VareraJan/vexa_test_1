import React from 'react';
import styled from 'styled-components';
import Frame1 from '../components/MainPage/Frame1';
import Frame2 from '../components/MainPage/Frame2';
import Frame3 from '../components/MainPage/Frame3';
import Frame4 from '../components/MainPage/Frame4';

const MainPage: React.FC = () => {
  return (
    <Container>
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
    </Container>
  );
};

const Container = styled.div`
  width: calc(var(--index) * 1440px);
  height: min-content;
  background: #fdffff;
`;

export default MainPage;
