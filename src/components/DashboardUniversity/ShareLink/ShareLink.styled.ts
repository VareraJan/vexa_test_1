import styled from 'styled-components';

export const Frame = styled.div`
  position: fixed;
  z-index: 500;
  // width: calc(var(--index) * 1440px);
  // height: calc(var(--index) * 4774px);
  width: calc(var(--index) * 100%);
  height: calc(var(--index) * 100%);
  width: 100%;
  height: 100%;

  background: rgba(217, 217, 217, 0.4);
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  position: fixed;
  top: calc(45% - calc(var(--index) * 60px));
  left: calc(50% - calc(var(--index) * 400px));

  width: calc(var(--index) * 800px);
  min-height: calc(var(--index) * 120px);
  padding-top: calc(var(--index) * 15px);
  padding-bottom: calc(var(--index) * 15px);
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 30px);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    width: calc(var(--index) * 600px);
    text-align: center;

    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: calc(var(--index) * 20px);
    line-height: calc(var(--index) * 34px);

    letter-spacing: 0.01em;

    color: #1d1d1d;
  }
`;
