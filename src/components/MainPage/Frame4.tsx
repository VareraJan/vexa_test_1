import React from 'react';
import styled from 'styled-components';
import circlBir from '../../assets/img/mainPage/biruza_circle_group_2.svg';
import circlYel from '../../assets/img/mainPage/yellow_circle_group_2.svg';
import circlBir1 from '../../assets/img/mainPage/biruza_circle_group_3.svg';
import circlYel1 from '../../assets/img/mainPage/yellow_circle_group_3.svg';
import iphoneclose from '../../assets/img/mainPage/iphoneclose.png';
import vector3 from '../../assets/img/mainPage/Vector3.svg';
import img1 from '../../assets/img/mainPage/Rectangle1.png';
import img2 from '../../assets/img/mainPage/Rectangle2.png';



const Frame4: React.FC = () => {
  return (
    <Conteiner>
      <LogoWrapper left={'172px'} top={'19px'}>
        <Logo src={circlBir} width='98px'/>
      </LogoWrapper>
      <LogoWrapper left={'1269px'} top={'167px'}>
        <Logo src={circlYel} width='98px'/>
      </LogoWrapper>

      <LogoWrapper left={'551px'} top={'210px'}>
        <Logo src={iphoneclose} width='292px'/>
      </LogoWrapper>

      <LogoWrapper left={'0px'} top={'641px'}>
        <Logo src={vector3} width='689px'/>
      </LogoWrapper>

      <LogoWrapper left={'734px'} top={'918px'}>
        <Logo src={circlBir1} width='104px'/>
      </LogoWrapper>
      <LogoWrapper left={'1046px'} top={'1150px'}>
        <Logo src={circlYel1} width='210px'/>
      </LogoWrapper>

      <LogoWrapper left={'1046px'} top={'862px'}>
        <Logo src={img2} width='294px'/>
      </LogoWrapper>
      <LogoWrapper left={'753px'} top={'953px'}>
        <Logo src={img1} width='325px'/>
      </LogoWrapper>

      <Btn left={'787px'} top={'347px'}>
        Watch and engage with student generated content
      </Btn>
      <Btn left={'132px'} top={'436px'} padding={'12px 23px'}>
        Set filters on your interests by category to see content that interests you
      </Btn>
      <Btn left={'735px'} top={'548px'}>
        Go to an institution's profile directly to learn more about it
      </Btn>
      <Btn left={'173px'} top={'641px'}>
        Chat directly with ambassadors to follow up
      </Btn>
      <Title textAlign='center'>Authentic Discovery</Title>
      <SubTitle textAlign='center'>I think we need to add some text here</SubTitle>

      <Title width='491px' marginLeft='100px' paddingTop='732px'>
        Join the VEXA Community
      </Title>
      <SubTitle marginLeft='100px'>Help you to reach your education goal</SubTitle>
      {/* <Btn left={'100px'} top={'1132px'}>
        Get Started
      </Btn> */}
    </Conteiner>
  );
};

const Conteiner = styled.div`
  position: relative;
  width: calc(var(--index) * 1440px);
  height: calc(var(--index) * 1241px);
  margin-bottom: calc(var(--index) * 101px);
`;
const Logo = styled.img`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
`;
interface ILogoWrapper {
  left?: string;
  top?: string;
}
const LogoWrapper = styled.div<ILogoWrapper>`
  position: absolute;
  left: calc(var(--index) * ${(props) => props.left});
  top: calc(var(--index) * ${(props) => props.top});
`;
interface IBtn {
  padding?: string;
  left?: string;
  top?: string;
  pt?: string;
  pl?: string;
}
const Btn = styled.div<IBtn>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: calc(var(--index) * ${(props) => props.pt || '12px'});
  padding-bottom: calc(var(--index) * ${(props) => props.pt || '12px'});
  padding-left: calc(var(--index) * ${(props) => props.pl || '50px'});
  padding-right: calc(var(--index) * ${(props) => props.pl || '50px'});
  gap: calc(var(--index) * 10px);

  position: absolute;
  left: calc(var(--index) * ${(props) => props.left});
  top: calc(var(--index) * ${(props) => props.top});

  background: #02b0bb;
  box-shadow: 0px 4px 8px rgba(2, 176, 187, 0.5);
  border-radius: calc(var(--index) * 24px);

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: 0.01em;

  color: #ffffff;
`;

interface IText {
  paddingTop?: string;
  marginTop?: string;
  marginLeft?: string;
  textAlign?: string;
  width?: string;
}
const Title = styled.div<IText>`
  padding-top: calc(var(--index) * ${(props) => props.paddingTop || '44px'});
  margin-top: calc(var(--index) * ${(props) => props.marginTop});
  margin-left: calc(var(--index) * ${(props) => props.marginLeft});
  width: calc(var(--index) * ${(props) => props.width});

  margin-bottom: calc(var(--index) * 16px);
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 55px);
  line-height: calc(var(--index) * 75px);

  text-align: ${(props) => props.textAlign || ''};
  letter-spacing: 0.003em;

  color: #1d1d1d;
`;

const SubTitle = styled.div<IText>`
  margin-left: calc(var(--index) * ${(props) => props.marginLeft});

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 20px);
  line-height: calc(var(--index) * 34px);

  text-align: ${(props) => props.textAlign || ''};
  letter-spacing: 0.01em;

  color: #464646;
`;

export default Frame4;
