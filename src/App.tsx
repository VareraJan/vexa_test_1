import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import styled from 'styled-components';
import './App.scss';
import { Navigation } from 'components/Navigation';

const App = () => {

  return (
    <Container>
      <Navigation />
      <AppRouter />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
`;

export default App;
