import React from 'react';
import styled from 'styled-components';
import vector from '../../assets/img/mainPage/Vector1.svg';
import circlBir from '../../assets/img/mainPage/biruza_circle_group_1.svg';
import circlYel from '../../assets/img/mainPage/yellow_circle_group_1.svg';
import studentIcon from '../../assets/img/mainPage/student-icon.svg';
import ambassadoreIcon from '../../assets/img/mainPage/ambassador-icon.svg';
import educationIcon from '../../assets/img/mainPage/education-icon.svg';



const Frame3: React.FC = () => {
  return (
    <Container>
      <LogoWrapper>
        <Logo src={vector} width='1440px'/>
      </LogoWrapper>
      <LogoWrapper left={'1013px'} top={'101px'}>
        <Logo src={circlBir} width='98px'/>
      </LogoWrapper>
      <LogoWrapper left={'112px'} top={'543px'}>
        <Logo src={circlYel} width='98px' />
      </LogoWrapper>
      <Title>Why Should You Use VEXA?</Title>

      <Card>
        <div className='logo'>
          <CirclWrapperIcon>
            <Logo src={studentIcon} width='35px' />
          </CirclWrapperIcon>
        </div>
        <div className='content'>
          <h1>Prospective Students</h1>
          <div>
            <CirclWrapperIcon width='10px' marginTop='10px' />
            <div className='text'>
              Opportunity for <strong>authentic discovery and engagement</strong> with others who
              have been in your position.
            </div>
          </div>
          <div>
            <CirclWrapperIcon width='10px' marginTop='10px' />
            <div className='text'>
              Enjoy a fast-tracked application process; receive results and feedback from
              institutions faster.
            </div>
          </div>
          <div>
            <CirclWrapperIcon width='10px' marginTop='10px' />
            <div className='text'>
              Join your new institution’s community before physically traveling abroad.
            </div>
          </div>
        </div>
      </Card>

      <Card even color={'#8CC89E'}>
        <div className='logo'>
          <CirclWrapperIcon
            linearGradient={'164.06deg, #8CC89E 11.11%, rgba(140, 200, 158, 0.5) 105.76%'}>
            <Logo src={ambassadoreIcon} width='50px'/>
          </CirclWrapperIcon>
        </div>
        <div className='content'>
          <h1>Ambassadors</h1>
          <div>
            <CirclWrapperIcon
              width='10px'
              marginTop='10px'
              linearGradient={'164.06deg, #8CC89E 11.11%, rgba(140, 200, 158, 0.5) 105.76%'}
            />
            <div className='text'>
              Chance to give back to your Institution by helping showcase it to prospective
              students, mentor students and have a positive impact on their future.
            </div>
          </div>
          <div>
            <CirclWrapperIcon
              width='10px'
              marginTop='10px'
              linearGradient={'164.06deg, #8CC89E 11.11%, rgba(140, 200, 158, 0.5) 105.76%'}
            />
            <div className='text'>
              Get recognized and rewarded for your work by your Institution and from the VEXA
              community.
            </div>
          </div>
          <div>
            <CirclWrapperIcon
              width='10px'
              marginTop='10px'
              linearGradient={'164.06deg, #8CC89E 11.11%, rgba(140, 200, 158, 0.5) 105.76%'}
            />
            <div className='text'>
              Participate in a diverse, vibrant community and be able demonstrate responsibility and
              work experience on CV.
            </div>
          </div>
        </div>
      </Card>

      <Card color={'#9BD5E4'}>
        <div className='logo'>
          <CirclWrapperIcon
            linearGradient={'1164.06deg, #9BD5E4 11.11%, rgba(155, 213, 228, 0.5) 105.76%'}>
            <Logo src={educationIcon} width='50px' />
          </CirclWrapperIcon>
        </div>
        <div className='content'>
          <h1>Prospective Students</h1>
          <div>
            <CirclWrapperIcon
              width='10px'
              marginTop='10px'
              linearGradient={'1164.06deg, #9BD5E4 11.11%, rgba(155, 213, 228, 0.5) 105.76%'}
            />
            <div className='text'>
              Opportunity for <strong>authentic discovery and engagement</strong> with others who
              have been in your position.
            </div>
          </div>
          <div>
            <CirclWrapperIcon
              width='10px'
              marginTop='10px'
              linearGradient={'1164.06deg, #9BD5E4 11.11%, rgba(155, 213, 228, 0.5) 105.76%'}
            />
            <div className='text'>
              Enjoy a fast-tracked application process; receive results and feedback from
              institutions faster.
            </div>
          </div>
          <div>
            <CirclWrapperIcon
              width='10px'
              marginTop='10px'
              linearGradient={'1164.06deg, #9BD5E4 11.11%, rgba(155, 213, 228, 0.5) 105.76%'}
            />
            <div className='text'>
              Join your new institution’s community before physically traveling abroad.
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: calc(var(--index) * 1440px);
  height: calc(var(--index) * 1089px);
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

const Title = styled.div`
  padding-top: calc(var(--index) * 145px);
  margin-left: calc(var(--index) * 116px);

  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 55px);
  line-height: 130%;

  letter-spacing: 0.003em;

  color: #1d1d1d;
`;

interface ICard {
  color?: string;
  even?: boolean;
}
const Card = styled.div<ICard>`
  width: calc(var(--index) * 1223px);
  min-height: calc(var(--index) * 162px);
  margin-top: calc(var(--index) * 62px);
  margin-left: calc(var(--index) * 116px);

  display: flex;
  ${(props) => (props.even ? 'flex-direction: row-reverse;' : '')}

  .logo {
    display: flex;
    ${(props) => (props.even ? 'flex-direction: row-reverse;' : '')}
    width: calc(var(--index) * 122px);
  }

  .content {
    width: calc(var(--index) * 1101px);

    h1 {
      ${(props) => (props.even ? 'text-align: right;' : '')}

      margin-bottom: calc(var(--index) * 20px);

      font-family: 'Quicksand';
      font-style: normal;
      font-weight: 600;
      font-size: calc(var(--index) * 28px);
      line-height: calc(var(--index) * 34px);

      letter-spacing: 0.01em;

      color: ${(props) => props.color || '#02b0bb'};
    }

    & > div {
      ${(props) => (props.even ? 'flex-direction: row-reverse;' : '')}

      margin-top: calc(var(--index) * 12px);
      // height: 28px;
      display: flex;
      // align-items: center;
      font-family: 'Quicksand';
      font-style: normal;
      font-weight: 400;
      font-size: calc(var(--index) * 18px);
      line-height: calc(var(--index) * 28px);

      letter-spacing: 0.01em;

      color: #464646;
      .text {
        ${(props) =>
          props.even
            ? 'text-align: right; max-width: calc(var(--index) * 954px); margin-right: calc(var(--index) * 13px);'
            : 'margin-left: calc(var(--index) * 13px);'}
      }
    }
  }
`;
interface ICirclWrapperIcon {
  linearGradient?: string;
  width?: string;
  marginTop?: string;
}
const CirclWrapperIcon = styled.div<ICirclWrapperIcon>`
  // position: absolute;
  width: calc(var(--index) * ${(props) => props.width || '90px'});
  height: calc(var(--index) * ${(props) => props.width || '90px'});
  margin-top: calc(var(--index) * ${(props) => props.marginTop});

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    ${(props) =>
      props.linearGradient || `164.06deg, #02b0bb 11.11%, rgba(2, 176, 187, 0.5) 105.76%`}
  );
  border-radius: 50%;
`;

export default Frame3;
