import React from 'react';
import vexaLogo from '../../assets/img/logo-vexa_1.svg';
import appleStoreLogo from '../../assets/img/footer/appstore.svg';
import googleStoreLogo from '../../assets/img/footer/googleplay.svg';
import emailIcon from '../../assets/img/socialNetwork/email-icon.svg';
import facebookIcon from '../../assets/img/socialNetwork/facebook-icon.svg';
import inIcon from '../../assets/img/socialNetwork/in-icon.svg';
import instagrammIcon from '../../assets/img/socialNetwork/instagramm-icon.svg';
import twitterIcon from '../../assets/img/socialNetwork/twitter-icon.svg';
import {
  Container,
  Copyright,
  InfoContainer,
  LincBlockContainer,
  LincContainer,
  Line,
  LinkBlock,
  Logo,
  LogosContainer,
  LogoWrapper,
  SocialAndCopyrightContainer,
  SocialIconBlock,
} from './Footer.styled';

const Footer: React.FC = () => {
  return (
    <Container>
      <LogosContainer>
        <LogoWrapper top='136px' left='100px'>
          <Logo src={vexaLogo} width='240px' />
        </LogoWrapper>
        <LogoWrapper top='117px' left='100px'>
          <Logo src={appleStoreLogo} width='180px' />
        </LogoWrapper>
        <LogoWrapper top='23px' left='100px'>
          <Logo src={googleStoreLogo} width='180px' />
        </LogoWrapper>
      </LogosContainer>

      <InfoContainer>
        <LincContainer>
          <LincBlockContainer>
            <LinkBlock head>Terms & policies</LinkBlock>
            <LinkBlock>Terms of Service</LinkBlock>
            <LinkBlock>Privacy Policy</LinkBlock>
          </LincBlockContainer>

          <LincBlockContainer>
            <LinkBlock head>Company</LinkBlock>
            <LinkBlock>Home</LinkBlock>
            <LinkBlock>About Us</LinkBlock>
            <LinkBlock>Contact Us</LinkBlock>
          </LincBlockContainer>

          <LincBlockContainer marginRight={'123px'}>
            <LinkBlock head>Contact</LinkBlock>
            <LinkBlock>Phone</LinkBlock>
            <LinkBlock>Email</LinkBlock>
          </LincBlockContainer>

          <LincBlockContainer marginRight={'0px'}>
            <LinkBlock head>Location</LinkBlock>
            <LinkBlock>Location here</LinkBlock>
          </LincBlockContainer>
        </LincContainer>

        <SocialAndCopyrightContainer>
          <SocialIconBlock>
            <Logo src={facebookIcon} />
            <Logo src={instagrammIcon} />
            <Logo src={inIcon} />
            <Logo src={emailIcon} />
            <Logo src={twitterIcon} />
          </SocialIconBlock>
          <Line />
          <Copyright>Copyright @ 2022 VEXA. All Right Reserved</Copyright>
        </SocialAndCopyrightContainer>
      </InfoContainer>
    </Container>
  );
};

export default Footer;
