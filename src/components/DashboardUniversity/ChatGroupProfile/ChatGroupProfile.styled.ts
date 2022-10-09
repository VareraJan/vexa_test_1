import styled from 'styled-components';

export const Frame = styled.div`
  position: fixed;
  z-index: 500;
  width: calc(var(--index) * 1440px);
  height: calc(var(--index) * 4774px);
  width: 100%;
  height: 100%;

  background: rgba(217, 217, 217, 0.4);
  top: 0;
  left: 0;
`;

export const Container = styled.div`
  position: fixed;
  top: calc(50% - calc(var(--index) * 210px));
  left: calc(50% - calc(var(--index) * 326px));

  width: calc(var(--index) * 653px);
  min-height: calc(var(--index) * 420px);
  padding-top: calc(var(--index) * 15px);
  padding-left: calc(var(--index) * 10px);
  padding-right: calc(var(--index) * 10px);
  padding-bottom: calc(var(--index) * 40px);
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 30px);
  z-index: 1000;

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 18px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;

  // display: flex;
  // flex-direction: column;
  // align-items: center;

  h2 {
    font-size: calc(var(--index) * 26px);
    text-align: center;
  }
`;

export const AmbassadorsBlock = styled.div`
  margin-top: calc(var(--index) * 20px);
  display: flex;
  ul {
    width: 50%;

    li {
      width: 80%;
      display: flex;
      justify-content: space-between;
    }
  }
`;
