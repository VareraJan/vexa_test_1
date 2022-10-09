import styled from 'styled-components';

interface ContainerProps {
  height?: string;
}
export const Container = styled.div<ContainerProps>`
  min-height: calc(var(--index) * ${(props) => props.height || '336px'});
  width: calc(var(--index) * 890px);
  z-index: 100;
`;

export const Line = styled.div`
  width: calc(var(--index) * 882px);
  height: 0px;
  margin-bottom: calc(var(--index) * 31px);

  border: 1px solid #02b0bb;
  z-index: 100;
`;

interface ErrorMessageProps {
  width?: string;
}

export const ErrorMessage = styled.div<ErrorMessageProps>`
  width: calc(var(--index) * ${(props) => props.width || '890px'});
  text-align: center;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: calc(var(--index) * 28px);
  line-height: calc(var(--index) * 28px);
  letter-spacing: 0.25px;
  color: tomato;
  margin: 10px 0;
`;

export const InputBlock = styled.div`
  min-height: calc(var(--index) * 73px);
  margin-bottom: calc(var(--index) * 36px);
  display: flex;
  flex-direction: column;

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

    width: calc(var(--index) * 659px);
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

  textarea {
    width: calc(var(--index) * 659px);
    height: calc(var(--index) * 136px);
    padding: calc(var(--index) * 13px) 0px calc(var(--index) * 17px) calc(var(--index) * 10px);
    background: #ffffff;
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 500;
    font-size: calc(var(--index) * 14px);
    line-height: calc(var(--index) * 34px);
    border: 1px solid #b2b2b2;
    border-radius: calc(var(--index) * 14px);
  }
  .btn-group {
    display: flex;
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
  font-size: calc(var(--index) * 12px);
  line-height: calc(var(--index) * 28px);
  letter-spacing: 0.25px;
  `}

  color: ${(props) => (props.active ? '#FFFFFF' : '#000000')};

  opacity: ${(props) => (props.active ? '' : '0.5')};

  &:active {
    transform: translateY(1px);
  }
`;

interface ImageWrapperProps {
  url: string;
}

export const ImageWrapper = styled.div<ImageWrapperProps>`
  display: inline-block;
  margin-left: calc(var(--index) * 5px);
  width: calc(var(--index) * 15px);
  height: calc(var(--index) * 15px);
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-size: cover;

  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
  
  &:active {transform: translateY(1px);
`;

interface ILogo {
  pointer?: boolean;
}
export const Logo = styled.img<ILogo>`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
  ${(props) => (props.pointer ? 'cursor: pointer;' : '')}  
  &:active {transform: translateY(1px);}
`;

interface IActionWrapper {
  width?: string;
  acceptApproved?: boolean;
  deleteApproved?: boolean;
  accept?: boolean;
  delete?: boolean;
}
export const ActionWrapper = styled.div<IActionWrapper>`
  width: calc(var(--index) * ${(props) => props.width});
  height: calc(var(--index) * ${(props) => props.width});
  ${(props) =>
    props.acceptApproved
      ? `position:absolute;top: calc(var(--index) * 55px);left: calc(var(--index) * 57px);
      background: linear-gradient(180deg, rgba(2, 176, 187, 0.8) 0%, #02B0BB 100%);`
      : ''}
  ${(props) =>
    props.accept
      ? `background: linear-gradient(180deg, rgba(2, 176, 187, 0.8) 0%, #02B0BB 100%);`
      : ''}
  ${(props) =>
    props.delete
      ? `background: linear-gradient(180deg, rgba(255, 92, 0, 0.8) 0%, #FF5C00 100%);`
      : ''}
  ${(props) =>
    props.deleteApproved
      ? `position:absolute;top: calc(var(--index) * 55px);left: calc(var(--index) * -10px);
      background: linear-gradient(180deg, rgba(255, 92, 0, 0.8) 0%, #FF5C00 100%);`
      : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

interface ContentBlocksProps {
  marginBottom?: string;
  marginTop?: string;
}

export const ContentBlocks = styled.div<ContentBlocksProps>`
  margin-bottom: calc(var(--index) * ${(props) => props.marginBottom || 0});
  margin-top: calc(var(--index) * ${(props) => props.marginTop || 0});

  display: flex;
  justify-content: space-between;
`;
