import styled from 'styled-components';

export const Frame = styled.div`
  display: flex;
  .uploader {
    opacity: 0;
    height: 0;
    width: 0;
    line-height: 0;
    overflow: hidden;
    pading: 0;
    margin: 0;
  }
`;

export const Container = styled.div`
  width: calc(var(--index) * 793px);
  min-height: calc(var(--index) * 1010px);
`;

interface IInputBlock {
  width?: string;
  height?: string;
}
export const InputBlock = styled.div<IInputBlock>`
  min-height: calc(var(--index) * 73px);
  margin-right: calc(var(--index) * 44px);
  margin-bottom: calc(var(--index) * 27px);
  display: flex;
  flex-direction: column;

  div {
    margin-top: 3px;
    font-family: 'Quicksand';
    color: red;
    text-align: center;
  }

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

    width: calc(var(--index) * ${(props) => props.width || '300px'});
    height: calc(var(--index) * ${(props) => props.height || '48px'});

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
    width: calc(var(--index) * 644px);
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
  .input-group {
    display: flex;
    margin-left: 10px;
    height: min-content;
    align-items: center;
    label {
      height: min-content;
    }
    input {
      margin-right: calc(var(--index) * 14px);
    }
  }
`;

export const InfoBlock1 = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: calc(var(--index) * 23px);
`;

export const ButtonBlock = styled.div`
  min-height: calc(var(--index) * 73px);
  margin-bottom: calc(var(--index) * 27px);
  display: flex;
  flex-direction: column;
  .title {
    height: calc(var(--index) * 25px);
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 600;
    font-size: calc(var(--index) * 14px);
    line-height: calc(var(--index) * 28px);

    letter-spacing: 0.25em;

    color: #1d1d1d;
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
  margin-right: calc(var(--index) * ${(props) => props.marginRight || '12px'});
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

export const PhotosBlock = styled.div`
  margin-top: calc(var(--index) * 31px);
  margin-bottom: calc(var(--index) * 51px);
  .title {
    height: calc(var(--index) * 25px);
    margin-bottom: calc(var(--index) * 10px);
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 600;
    font-size: calc(var(--index) * 14px);
    line-height: calc(var(--index) * 28px);

    letter-spacing: 0.25em;

    color: #1d1d1d;
  }
  ul {
    display: flex;

    li {
      position: relative;
      margin-right: calc(var(--index) * 34px);
      width: calc(var(--index) * 120px);
      height: calc(var(--index) * 120px);

      display: flex;
      justify-content: center;
      align-items: center;

      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
      border-radius: calc(var(--index) * 30px);
    }
  }
`;

interface IIconWrapper {
  width?: string;
  left?: string;
  top?: string;
}
export const IconWrapper = styled.div<IIconWrapper>`
  position: absolute;
  width: calc(var(--index) * ${(props) => props.width});
  height: calc(var(--index) * ${(props) => props.width});
  left: calc(var(--index) * ${(props) => props.left});
  top: calc(var(--index) * ${(props) => props.top});
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(180deg, #b2b2b2 0%, #8f9090 100%);
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  &:hover {
    background: linear-gradient(180deg, rgba(255, 92, 0, 0.8) 0%, #ff5c00 100%);
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const Logo = styled.img`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
`;

interface ILogoPhoto {
  url?: string | ArrayBuffer;
  urlDef?: string;
  width?: string;
}
export const LogoPhoto = styled.div<ILogoPhoto>`
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width || '120px'});
  height: calc(var(--index) * ${(props) => props.width || '120px'});
  border-radius: calc(var(--index) * 30px);

  ${(props) =>
    props.url !== undefined && props.url !== ''
      ? `background-image:url(${props.url});
    background-position:center center;
    background-size:cover;`
      : `background-image:url(${props.urlDef});
      background-repeat:no-repeat;
      background-position:center center;
      `}
`;

export const UniversityTextBlock = styled.div`
  margin-bottom: calc(var(--index) * 25px);
`;
export const UniversityName = styled.div`
  height: calc(var(--index) * 34px);
  margin-bottom: calc(var(--index) * 10px);
  display: flex;
  align-items: center;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 24px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
`;

export const UniversityAddress = styled.div`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
`;

interface ILogoWrapper {
  marginLeft?: string;
}

export const LogoWrapper = styled.div<ILogoWrapper>`
  margin-left: calc(var(--index) * ${(props) => props.marginLeft});

  display: flex;
  align-items: center;
`;

interface IPhotoWrapper {
  url?: string;
  urlDef?: string;
}

export const PhotoWrapper = styled.div<IPhotoWrapper>`
  width: calc(var(--index) * 140px);
  height: calc(var(--index) * 140px);
  margin-top: calc(var(--index) * 100px);
  margin-right: calc(var(--index) * 35px);

  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 30px);
  ${(props) =>
    props.url !== undefined && props.url.length > 0
      ? `background-image:url(${props.url});
    background-position:center center;
    background-size:cover;`
      : `background-image:url(${props.urlDef});
      background-repeat:no-repeat;
      background-position:center center;
      `}

  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(1px);
  }
`;
