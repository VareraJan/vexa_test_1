import React from 'react';
import styled from 'styled-components';
import vector from '../../assets/img/mainPage/Vector2.svg';
import circlBir1 from '../../assets/img/mainPage/biruza_circle_group.svg';
import circlYel1 from '../../assets/img/mainPage/yellow_circle_group.svg';
import studentIcon from '../../assets/img/mainPage/student-icon.svg';
import ambassadoreIcon from '../../assets/img/mainPage/ambassador-icon.svg';
import educationIcon from '../../assets/img/mainPage/education-icon.svg';



const Frame2: React.FC = () => {
  return (
    <Container>
      <LogoWrapper left={'959px'} top={'0px'}>
        <Logo src={vector} width='481px' />
      </LogoWrapper>
      <LogoWrapper left={'172px'} top={'135px'}>
        <Logo src={circlBir1} width='98px' />
      </LogoWrapper>
      <LogoWrapper left={'1269px'} top={'283px'}>
        <Logo src={circlYel1} width='98px' />
      </LogoWrapper>
      <TitleContainer>
        <Title>How it works</Title>
        <SubTitle>I think we need to add some text here</SubTitle>
      </TitleContainer>

      <CardContainer>
        <Card marginLeft='110px'>
          <CardTitleBlock>
            <IconWrapper>
              <Logo src={studentIcon} width='35px' />
            </IconWrapper>
            <CardTitle>Prospective Students</CardTitle>
          </CardTitleBlock>

          <CardContentBlock>
            <div> 1. Download the VEXA student app.</div>
            <div>
              2. Fill out a brief profile so that you stand out and are seen by institutions.
            </div>
            <div>
              3. Engage with content, Follow institutions, chat with institutions and ambassadors.
            </div>
            <div>4. Send in your applications for fast-track assessment.</div>
          </CardContentBlock>
        </Card>
        <Card marginLeft='32px' marginRight='32px'>
          <CardTitleBlock>
            <IconWrapper
              linearGradient={'1164.06deg, #9BD5E4 11.11%, rgba(155, 213, 228, 0.5) 105.76%'}>
              <Logo src={educationIcon} width='40px' />
            </IconWrapper>
            <CardTitle marginTop='50px' color={'#9BD5E4'}>
              Higher Education Institution
            </CardTitle>
          </CardTitleBlock>
          <CardContentBlock>
            <div>1. Register your account on VEXA’s web portal (see link).</div>
            <div>
              2. Fill out the profile of your institution so that prospective students can find you
              and engage with you.
            </div>
            <div>3. Approve ambassadors to upload content and engage with students in the app.</div>
            <div>
              4. Receive analytics and information of students who engage with your institution in
              the app so you can prioritize their applications.
            </div>
          </CardContentBlock>
        </Card>
        <Card>
          <CardTitleBlock>
            <IconWrapper
              linearGradient={'164.06deg, #8CC89E 11.11%, rgba(140, 200, 158, 0.5) 105.76%'}>
              <Logo src={ambassadoreIcon} width='40px' />
            </IconWrapper>
            <CardTitle color={'#8CC89E'}>Ambassador</CardTitle>
          </CardTitleBlock>
          <CardContentBlock>
            <div> 1. Download the VEXA Ambassador app.</div>
            <div>
              2. Fill out a brief profile so that you can be approved and recognized by your
              institution.
            </div>
            <div>3. Upload content and engage with prospective students in the app.</div>
            <div>4. Participate in contests and get rewarded for your hard work!</div>
          </CardContentBlock>
        </Card>
      </CardContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: calc(var(--index) * 955px);
  width: calc(var(--index) * 1440px);
`;
const Logo = styled.img`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
`;

interface ILogoWrapper {
  left: string;
  top: string;
}
const LogoWrapper = styled.div<ILogoWrapper>`
  position: absolute;
  left: calc(var(--index) * ${(props) => props.left});
  top: calc(var(--index) * ${(props) => props.top});
`;

const TitleContainer = styled.div`
  height: calc(var(--index) * 329px);
  width: calc(var(--index) * 1440px);
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-top: calc(var(--index) * 160px);
  margin-left: calc(var(--index) * 525px);
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 55px);
  line-height: calc(var(--index) * 75px);

  letter-spacing: 0.003em;
  color: #1d1d1d;
`;

const SubTitle = styled.div`
  margin-top: calc(var(--index) * 16px);
  margin-left: calc(var(--index) * 520px);
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 20px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #464646;
`;

const CardContainer = styled.div`
  width: calc(var(--index) * 1440px);
  height: calc(var(--index) * 626px);
  display: flex;
`;

interface ICard {
  marginLeft?: string;
  marginRight?: string;
}
const Card = styled.div<ICard>`
  width: calc(var(--index) * 380px);
  min-height: calc(var(--index) * 300px);
  height: max-content;
  background: #ffffff;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.05);
  border-radius: calc(var(--index) * 20px);
  margin-left: calc(var(--index) * ${(props) => props.marginLeft});
  margin-right: calc(var(--index) * ${(props) => props.marginRight});
  z-index: 100;
`;

const CardTitleBlock = styled.div`
  width: calc(var(--index) * 380px);
  height: calc(var(--index) * 144px);
  padding-left: calc(var(--index) * 40px);
  display: flex;
`;
interface IIconWrapper {
  linearGradient?: string;
}
const IconWrapper = styled.div<IIconWrapper>`
  width: calc(var(--index) * 70px);
  height: calc(var(--index) * 70px);
  margin-top: calc(var(--index) * 49px);

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    ${(props) =>
      props.linearGradient || `164.06deg, #02b0bb 11.11%, rgba(2, 176, 187, 0.5) 105.76%`}
  );
  border-radius: 50%;
`;

interface ICardTitle {
  marginTop?: string;
}
const CardTitle = styled.div<ICardTitle>`
  margin-top: calc(var(--index) * ${(props) => props.marginTop || '67px'});
  margin-left: calc(var(--index) * 21px);
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: calc(var(--index) * 20px);
  line-height: calc(var(--index) * 34px);
  letter-spacing: 0.01em;

  color: ${(props) => props.color || '#02b0bb'};
`;

const CardContentBlock = styled.div`
  width: calc(var(--index) * 309px);
  min-height: calc(var(--index) * 282px);
  margin-left: calc(var(--index) * 40px);
  margin-right: calc(var(--index) * 31px);
  margin-bottom: calc(var(--index) * 49px);
  display: flex;
  flex-direction: column;

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 18px);
  line-height: calc(var(--index) * 28px);

  letter-spacing: 0.01em;
  color: #464646;
  opacity: 0.8;

  div {
    margin-bottom: calc(var(--index) * 7px);
  }
`;

export default Frame2;
