import React from 'react';
import styled from 'styled-components';
import notebook from '../../assets/img/mainPage/Notebook.png';
import iphone from '../../assets/img/mainPage/iphone.png';
import { useAppDispatch } from '../../redux/store';
import { setOpen } from '../../redux/slices/auth/authSlice';

const Frame1: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Frame>
        <Ellipse left={'641px'} top={'363px'} />
        <Ellipse
          left={'84px'}
          top={'87px'}
          linearGradient={'180deg, rgba(140, 200, 158, 0.8) 0%, #8CC89E 100%'}
        />
        <Ellipse
          left={'1134px'}
          top={'-9px'}
          linearGradient={'180deg, rgba(255, 221, 53, 0.8) 0%, #FFDD35 100%'}
        />
        <Ellipse
          left={'861px'}
          top={'10px'}
          linearGradient={'180deg, rgba(155, 213, 228, 0.8) 0%, #9BD5E4 100%'}
        />
        <Title>Discover International Education</Title>
        <Content>
          Discover, engage and connect directly with higher education institutions, student
          representatives and international alumni to find the place that best fits your lifestyle
          and goals.
        </Content>

        {/* <Btn active>Get Started</Btn> */}
        <a href={process.env.REACT_APP_STUDENT_APP_PATH}>
          <RoleBlock active>
            <CheckBox active>
              <div></div>
            </CheckBox>
            <div>I am a Prospective Student</div>
          </RoleBlock>
        </a>

        <RoleBlock onClick={() => dispatch(setOpen('registration'))}>
          <CheckBox>
            <div></div>
          </CheckBox>
          <div>I am an Ambassador</div>
        </RoleBlock>

        <RoleBlock onClick={() => dispatch(setOpen('login'))}>
          <CheckBox>
            <div></div>
          </CheckBox>
          <div>I am a Higher Education Institution</div>
        </RoleBlock>

        <LogoWrapper left={'782px'} top={'122px'}>
          <Logo src={notebook} width='909px' />
        </LogoWrapper>
        <LogoWrapper left={'933px'} top={'250px'}>
          <Logo src={iphone} width='217px' />
        </LogoWrapper>
      </Frame>
    </>
  );
};

const Frame = styled.div`
  position: relative;
  width: calc(var(--index) * 1440px);
  min-height: calc(var(--index) * 650px);
  height: max-content;

  & > div,
  button,
  a {
    margin-left: calc(var(--index) * 120px);
  }

  a {
    display: inline-block;
  }
`;

const Title = styled.div`
  width: calc(var(--index) * 686px);
  margin-top: calc(var(--index) * 106px);

  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: calc(var(--index) * 64px);
  line-height: calc(var(--index) * 87px);
  letter-spacing: 0.01em;

  color: #1d1d1d;
`;

const Content = styled.div`
  width: calc(var(--index) * 662px);
  margin: calc(var(--index) * 20px) 0;

  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 20px);
  line-height: 150%;
  letter-spacing: 0.01em;
  color: #464646;
`;

interface IBtn {
  active?: boolean;
}

const Btn = styled.button<IBtn>`
  padding: calc(var(--index) * 12px) calc(var(--index) * 30px);
  height: calc(var(--index) * 48px);
  background-color: ${(props) => (props.active ? '#02B0BB' : '#FDFFFF')};
  border: 1px solid #02b0bb;
  border-radius: calc(var(--index) * 24px);
  margin-bottom: calc(var(--index) * 38px);

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: 0.01em;

  color: ${(props) => (props.active ? '#fdffff' : '#02b0bb')};
`;
interface IEllipse {
  left: string;
  top: string;
  linearGradient?: string;
}
const Ellipse = styled.div<IEllipse>`
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
  z-index: 200;
`;

interface IRoleBlock {
  active?: boolean;
}
const RoleBlock = styled.div<IRoleBlock>`
  display: flex;
  align-items: center;
  margin-bottom: calc(var(--index) * 22px);

  font-family: 'Quicksand';
  font-style: normal;
  // font-weight: ${(props) => (props.active ? '700' : '500')};
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: 0.01em;
  color: #8f9090;
  cursor: pointer;

  &:hover {
    font-weight: 700;

    div {
      div {
        display: block;
      }
    }
  }
  &:active {
    transform: translateY(1px);
  }
`;
interface ICheckbox {
  active?: boolean;
}
const CheckBox = styled.div<ICheckbox>`
  width: calc(var(--index) * 48px);
  height: calc(var(--index) * 48px);
  margin-right: calc(var(--index) * 14px);

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #02b0bb;
  border-radius: calc(var(--index) * 24px);

  div {
    // ${(props) => (props.active ? '' : 'display: none;')}
    display: none;
    width: calc(var(--index) * 26px);
    height: calc(var(--index) * 26px);

    background: #02b0bb;
    box-shadow: 0px 4px 8px rgba(2, 176, 187, 0.5);
    border-radius: 50%;
  }
`;

export default Frame1;
