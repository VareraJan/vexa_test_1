import styled from 'styled-components';

export const Container = styled.div`
  width: calc(var(--index) * 890px);
  min-height: calc(var(--index) * 194px);
  margin-top: calc(var(--index) * 21px);

  display: flex;
  flex-flow: row wrap;

  background-color: #ffffff;
`;

interface IInputBlock {
  marginRight?: string;
  marginBottom?: string;
}
export const InputBlock = styled.div<IInputBlock>`
  min-height: calc(var(--index) * 73px);
  margin-right: calc(var(--index) * ${(props) => props.marginRight || '44px'});
  margin-bottom: calc(var(--index) * ${(props) => props.marginBottom || '27px'});
  display: flex;
  flex-direction: column;

  // background-color: tomato;

  label {
    height: calc(var(--index) * 25px);
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 600;
    font-size: calc(var(--index) * 14px);
    line-height: calc(var(--index) * 28px);

    letter-spacing: 0.25em;

    color: #1d1d1d;
  }

  input {
    box-sizing: border-box;

    width: calc(var(--index) * 300px);
    height: calc(var(--index) * 48px);

    border: 1px solid #b2b2b2;
    border-radius: calc(var(--index) * 40px);
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

  .btn-group {
    display: flex;
  }
  .empty {
    width: calc(var(--index) * 354px);
  }
`;

interface IBtn {
  active?: boolean;
  save?: boolean;
  width?: string;
  height?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

export const Btn = styled.button<IBtn>`
  width: calc(var(--index) * ${(props) => props.width || '80px'});
  height: calc(var(--index) * ${(props) => props.height || '48px'});
  margin-right: calc(var(--index) * ${(props) => props.marginRight});
  margin-left: calc(var(--index) * ${(props) => props.marginLeft});
  margin-bottom: calc(var(--index) * ${(props) => props.marginBottom});

  background: ${(props) => (props.active ? '#02B0BB' : '#FFFFFF')};
  border: 1px solid #d1d1d1;
  border-radius: calc(var(--index) * 50px);

  cursor: pointer;

  ${(props) =>
    props.save
      ? `font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);
  
  letter-spacing: 0.01em;`
      : `font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: calc(var(--index) * 14px);
  line-height: calc(var(--index) * 28px);
  letter-spacing: 0.25px;
  `}

  color: ${(props) => (props.active ? '#FFFFFF' : '#000000')};

  opacity: ${(props) => (props.active ? '' : '0.5')};

  &:active {
    transform: translateY(1px);
  }
`;
