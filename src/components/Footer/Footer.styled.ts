import styled from 'styled-components';

export const Container = styled.footer`
  width: calc(var(--index) * 1440px);
  height: calc(var(--index) * 548px);
  display: flex;
  background: #383638;
`;

export const LogosContainer = styled.div`
  width: calc(var(--index) * 418px);
  height: calc(var(--index) * 548px);
`;
interface ILogoWrapper {
  top?: string;
  left?: string;
}
export const LogoWrapper = styled.div<ILogoWrapper>`
  margin-top: calc(var(--index) * ${(props) => props.top});
  margin-left: calc(var(--index) * ${(props) => props.left});
`;
export const Logo = styled.img`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
`;

export const InfoContainer = styled.div`
  width: calc(var(--index) * 1022px);
  height: calc(var(--index) * 548px);
  display: flex;
  flex-direction: column;
`;

export const LincContainer = styled.div`
  height: calc(var(--index) * 418px);
  display: flex;
`;

interface ILinkBlock {
  head?: boolean;
}

interface ILincBlockContainer {
  marginRight?: string;
}
export const LincBlockContainer = styled.div<ILincBlockContainer>`
  margin-top: calc(var(--index) * 136px);
  width: max-content;
  height: max-content;
  margin-right: calc(var(--index) * ${(props) => props.marginRight || '77px'});
`;

export const LinkBlock = styled.div<ILinkBlock>`
  font-family: 'Quicksand';
  font-style: normal;
  margin-bottom: calc(var(--index) * 23px);
  ${(props) =>
    props.head
      ? `
  font-weight: 700;
  font-size: calc(var(--index) * 22px);
  line-height: calc(var(--index) * 28px);`
      : `font-weight: 300;
font-size: calc(var(--index) * 19px);
line-height: calc(var(--index) * 24px);`}
  color: #ffffff;
`;

export const SocialAndCopyrightContainer = styled.div`
  width: calc(var(--index) * 1022px);
  height: calc(var(--index) * 130px);
`;

export const SocialIconBlock = styled.div`
  width: calc(var(--index) * 360px);
  height: calc(var(--index) * 40px);
  margin-left: calc(var(--index) * 122px);
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--index) * 17px);
`;

export const Line = styled.div`
  width: calc(var(--index) * 500px);
  height: calc(var(--index) * 0px);
  margin-left: calc(var(--index) * 52px);
  border-bottom: 1px solid #ffffff;
`;

export const Copyright = styled.div`
  margin-top: calc(var(--index) * 17px);
  margin-left: calc(var(--index) * 112px);
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 18px);
  line-height: calc(var(--index) * 22px);
  color: #ffffff;
`;
