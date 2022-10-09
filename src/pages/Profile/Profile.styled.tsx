import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  // width: calc(var(--index) * 1440px);
  min-height: calc(var(--index) * 665px);

  display: flex;

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
  // background-color: tomato;

  left: calc(var(--index) * -238px);
`;

interface IEllipse {
  left: string;
  top: string;
  linearGradient?: string;
}

export const Ellipse = styled.div<IEllipse>`
  position: absolute;
  width: calc(var(--index) * 31px);
  height: calc(var(--index) * 31px);
  left: calc(var(--index) * calc(${(props) => props.left} - 120px));
  top: calc(var(--index) * ${(props) => props.top});

  border-radius: 50%;

  background: linear-gradient(
    ${(props) => props.linearGradient || '180deg, rgba(2, 176, 187, 0.8) 0%, #02B0BB 100%'}
  );
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
`;

export const ImageBlock = styled.div`
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: right;
  padding-right: calc(var(--index) * 35px);
  width: calc(var(--index) * 450px);
`;

export const InfoBlock = styled.div`
  width: calc(var(--index) * 990px);
  padding-top: calc(var(--index) * 31px);
  & > div {
    display: flex;
  }
`;

interface IIconWrapper {
  width?: string;
  active?: boolean;
  url?: string;
}

export const IconWrapper = styled.div<IIconWrapper>`
  width: calc(var(--index) * ${(props) => props.width || '140px'});
  height: calc(var(--index) * ${(props) => props.width || '140px'});
  ${(props) => (props.active ? 'background: #02B0BB' : 'background: #ffffff')};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 30px);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.url
      ? `background-image:url(${props.url});
    background-position:center center;
    background-size:cover;`
      : ''}

  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const ReturnWrapper = styled.div`
  width: calc(var(--index) * 44px);
  height: calc(var(--index) * 44px);
  margin-right: calc(var(--index) * 19px);
  background: linear-gradient(180deg, rgba(2, 176, 187, 0.8) 0%, #02b0bb 100%);

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

interface LogoProps {
  mleft?: string;
}

export const Logo = styled.img<LogoProps>`
  src=${(props) => props.src}
  padding: 0;
  margin-left: calc(var(--index) * ${(props) => props.mleft});
  width: calc(var(--index) * ${(props) => props.width});
  &:active {transform: translateY(1px);}
  cursor: pointer;
`;

interface TitleProps {
  size?: string;
  mtop?: string;
  mbottom?: string;
}

export const Title = styled.div<TitleProps>`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * ${(props) => props.size || '16px'});
  ${(props) => (props.mtop ? `margin-top: calc(var(--index) * ${props.mtop});` : '')}
  ${(props) => (props.mbottom ? `margin-bottom: calc(var(--index) * ${props.mbottom});` : '')}

  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
`;

interface ColorTextProps {
  mleft?: string;
  ptop?: string;
  size?: string;
  textDecoration?: string;
  pointer?: boolean;
}

export const ColorText = styled.div<ColorTextProps>`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  line-height: calc(var(--index) * 22px);

  ${(props) => (props.size ? `font-size: calc(var(--index) * ${props.size});` : '')}
  ${(props) => (props.mleft ? `margin-left: calc(var(--index) * ${props.mleft});` : '')}
  ${(props) => (props.ptop ? `padding-top: calc(var(--index) * ${props.ptop});` : '')}
  ${(props) => (props.textDecoration ? `text-decoration: ${props.textDecoration};` : '')}
  ${(props) => (props.pointer ? `cursor: pointer;&:active{transform: translateY(1px)};` : '')}


  display: flex;
  align-items: center;
  letter-spacing: 0.01em;

  color: #02b0bb;
`;

interface TextProps {
  size?: string;
  mtop?: string;
}

export const Text = styled.div<TextProps>`
  ${(props) => (props.size ? `font-size: calc(var(--index) * ${props.size});` : '')}
  ${(props) => (props.mtop ? `margin-top: calc(var(--index) * ${props.mtop});` : '')}
`;

export const Line = styled.div`
  width: calc(var(--index) * 381px);
  border-bottom: 1px solid #02b0bb;
  margin-top: calc(var(--index) * 22px);
  margin-bottom: calc(var(--index) * 9px);
`;

export const List = styled.ul`
  width: calc(var(--index) * 757px);
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`;

export const InfoLine = styled.li`
  width: calc(var(--index) * 334px);
  display: flex;
  justify-content: space-between;
`;
