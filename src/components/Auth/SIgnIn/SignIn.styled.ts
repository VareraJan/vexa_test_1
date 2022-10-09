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
  padding-bottom: calc(var(--index) * 40px);
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 30px);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;

  .btn-role-selectors {
    margin-top: calc(var(--index) * 41px);
  }

  .market-icon {
    display: flex;
    margin-top: calc(var(--index) * 41px);
  }

  .reset-password {
    margin-top: calc(var(--index) * 41px);
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: calc(var(--index) * 16px);
    line-height: calc(var(--index) * 34px);

    letter-spacing: 0.01em;

    color: #1d1d1d;
  }
`;

export const ErrorMessage = styled.div`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: calc(var(--index) * 14px);
  line-height: calc(var(--index) * 34px);
  text-align: center;
  color: tomato;
`;

interface IconMarketProps {
  url?: string;
}
export const IconMarket = styled.div<IconMarketProps>`
  width: calc(var(--index) * 100px);
  height: calc(var(--index) * 100px);
  background: #ffffff;
  border: 1px solid #02b0bb;
  border-radius: 50%;
  margin-right: calc(var(--index) * 27px);
  margin-left: calc(var(--index) * 27px);
  cursor: pointer;

  ${(props) =>
    props.url
      ? `background-image:url(${props.url});
  background-position:center center;
  background-repeat:no-repeat;
  `
      : ''}

  &:active {
    transform: translateY(1px);
  }
`;

export const Header = styled.div`
  margin-top: calc(var(--index) * 41px);
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 24px);
  line-height: calc(var(--index) * 34px);

  text-align: center;
  letter-spacing: 0.01em;

  color: #1d1d1d;
`;

export const InputBlock = styled.div`
  width: calc(var(--index) * 430px);
  height: calc(var(--index) * 80px);
  margin-top: calc(var(--index) * 14px);
  label {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: calc(var(--index) * 16px);
    line-height: calc(var(--index) * 34px);

    letter-spacing: 0.01em;

    color: #1d1d1d;
  }
  input {
    box-sizing: border-box;

    width: calc(var(--index) * 430px);
    height: calc(var(--index) * 46px);

    border: 1px solid #02b0bb;
    border-radius: calc(var(--index) * 14px);
    &:focus {
      border: 2px solid #02b0bb;
      outline: 0;
    }

    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    font-size: calc(var(--index) * 14px);
    line-height: calc(var(--index) * 34px);
    padding-left: calc(var(--index) * 21px);

    display: flex;
    align-items: center;
    letter-spacing: 0.01em;

    color: #1d1d1d;
  }
`;

export const ResetPassword = styled.div`
  width: max-content;
  margin-left: auto;
  margin-right: calc(var(--index) * 120px);
  display: flex;
  justify-content: end;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: calc(var(--index) * 14px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;
  text-decoration-line: underline;

  color: #1d1d1d;
  cursor: pointer;
`;

interface IBtn {
  active?: boolean;
}
export const Btn = styled.button<IBtn>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: calc(var(--index) * 23px);
  width: calc(var(--index) * 430px);
  height: calc(var(--index) * 48px);

  background-color: ${(props) => (props.active ? '#02B0BB' : '#FDFFFF')};
  box-shadow: ${(props) => (props.active ? '0px 4px 8px rgba(2, 176, 187, 0.5)' : '')};
  border: 1px solid #02b0bb;
  border-radius: ${(props) =>
    props.active ? 'calc(var(--index) * 24px)' : 'calc(var(--index) * 30px)'};

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: 0.01em;

  color: ${(props) => (props.active ? '#fdffff' : '#1D1D1D')};
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(1px);
  }
`;
