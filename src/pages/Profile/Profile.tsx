import React from 'react';

import Chart from '../../components/Chart';

import VectorLeft from '../../assets/img/Pagin/arrowBackWhite.svg';
import Star from '../../assets/img/Star.svg';
import {
  ColorText,
  Container,
  Ellipse,
  IconWrapper,
  ImageBlock,
  InfoBlock,
  InfoLine,
  Line,
  List,
  Logo,
  ReturnWrapper,
  Text,
  Title,
} from './Profile.styled';
import { IStudentToUniversity } from '../../redux/slices/filter/filterSlice';
import { IAmbassadorsToUniversity } from '../../redux/slices/ambassadors/ambassadorsSlice';

const Profile: React.FC<{
  user: 'student' | 'ambassador';
  userData?: IStudentToUniversity | IAmbassadorsToUniversity;
  closedFunc?: (param: null) => void;
}> = ({ user, userData, closedFunc }) => {
  return (
    <Container>
      {/* временно отключены, т.к. используются как компонент, а не отдельная страница */}
      {/* <Ellipse left={'384px'} top={'413px'} />
      <Ellipse
        left={'204px'}
        top={'137px'}
        linearGradient={'180deg, rgba(140, 200, 158, 0.8) 0%, #8CC89E 100%'}
      />
      <Ellipse
        left={'1326px'}
        top={'137px'}
        linearGradient={'180deg, rgba(255, 221, 53, 0.8) 0%, #FFDD35 100%'}
      />
      <Ellipse
        left={'678px'}
        top={'0px'}
        linearGradient={'180deg, rgba(155, 213, 228, 0.8) 0%, #9BD5E4 100%'}
      /> */}
      <ImageBlock>
        <ReturnWrapper
          onClick={() => {
            if (closedFunc) closedFunc(null);
          }}>
          <Logo src={VectorLeft} width='24px' />
        </ReturnWrapper>
        <IconWrapper url={''}>{/* <Logo src={university.image} width='80px' /> */}</IconWrapper>
      </ImageBlock>
      {userData && (
        <InfoBlock>
          <div>
            <Title size='24px'>
              {'name' in userData
                ? `${userData.name} ${userData.soname}`
                : `${userData.lastName} ${userData.firstName}`}
            </Title>
            {user === 'ambassador' && (
              <ColorText mleft='21px' ptop='5px' size='22px'>
                4.8 <Logo src={Star} width='18px' mleft='2px' />
              </ColorText>
            )}
          </div>
          <Text mtop='10px'>Status Profile</Text>
          <Line />
          <Title>About {user === 'student' ? 'Student' : 'Ambassador'}</Title>

          <List>
            <InfoLine>
              <Text size='14px'>Email</Text>
              <ColorText size='14px' textDecoration='underline' pointer>
                {userData.email}
              </ColorText>
            </InfoLine>

            <InfoLine>
              <Text size='14px'>Native Language</Text>
              <ColorText size='14px'>{userData.language || 'not specified'}</ColorText>
            </InfoLine>

            <InfoLine>
              <Text size='14px'>Date of Birth</Text>
              <ColorText size='14px'>{userData.birth || 'not specified'}</ColorText>
            </InfoLine>

            {user === 'student' && (
              <InfoLine>
                <Text size='14px'>Expected date of Enrollment:</Text>
                <ColorText size='14px'>12/08/2022 MOCK</ColorText>
              </InfoLine>
            )}

            <InfoLine>
              <Text size='14px'>{user === 'student' ? 'Country' : 'City'}</Text>
              <ColorText size='14px'>
                {'name' in userData ? userData.country : userData.city || 'not specified'}
              </ColorText>
            </InfoLine>
          </List>

          <Chart user={user} />
        </InfoBlock>
      )}
    </Container>
  );
};

export default Profile;
