import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: calc(50% - calc(var(--index) * 210px));
  left: calc(50% - calc(var(--index) * 326px));

  width: calc(var(--index) * 490px);
  // width: calc(var(--index) * 653px);
  min-height: calc(var(--index) * 420px);
  padding-bottom: calc(var(--index) * 40px);
  background: #f1f1f1;
  // background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 2%;
  // border-radius: calc(var(--index) * 30px);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
