import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: calc(var(--index) * 1440px);
  min-height: calc(var(--index) * 900px);
  // min-height: calc(var(--index) * 665px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IEllipse {
  left?: string;
  top?: string;
  linearGradient?: string;
}
export const Ellipse = styled.div<IEllipse>`
  position: absolute;
  width: calc(var(--index) * 31px);
  height: calc(var(--index) * 31px);
  left: calc(var(--index) * calc(${(props) => props.left}));
  top: calc(var(--index) * ${(props) => props.top});

  border-radius: 50%;
  background: linear-gradient(
    ${(props) => props.linearGradient || '180deg, rgba(2, 176, 187, 0.8) 0%, #02B0BB 100%'}
  );
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
`;

export const UniversityMenuBlock = styled.div`
  margin-top: calc(var(--index) * 59px);
  width: calc(var(--index) * 890px);
  min-height: calc(var(--index) * 140px);

  z-index: 100;
`;
export const UniversityInfo = styled.div`
  // width: calc(var(--index) * 587px);
  // width: calc(var(--index) * 617px);
  height: calc(var(--index) * 140px);
  display: flex;
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

interface ILogoWrapper {
  marginLeft?: string;
}

export const LogoWrapper = styled.div<ILogoWrapper>`
  margin-left: calc(var(--index) * ${(props) => props.marginLeft});

  display: flex;
  align-items: center;
  &:active {
    transform: translateY(1px);
  }
`;

export const Logo = styled.img`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
`;

export const UniversityTextBlock = styled.div`
  margin-top: calc(var(--index) * 31px);
  margin-bottom: calc(var(--index) * 31px);
  margin-left: calc(var(--index) * 35px);
`;
export const UniversityName = styled.div`
  height: calc(var(--index) * 34px);
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

export const Line = styled.div`
  width: calc(var(--index) * 882px);
  height: 0px;
  margin-top: calc(var(--index) * 34px);
  margin-bottom: calc(var(--index) * 25px);

  border: 1px solid #02b0bb;
  z-index: 100;
`;
