import React, { useEffect, useState } from 'react';
import edit from '../../assets/img/dashboard/edit-1.svg';

import { Link } from 'react-router-dom';
import { PathRouting } from '../../router';
import { useAppSelector } from '../../redux/store';
import { IUniversity } from '../../redux/slices/university/universitySlice';
import {
  Container,
  Ellipse,
  IconWrapper,
  Line,
  Logo,
  LogoWrapper,
  UniversityAddress,
  UniversityInfo,
  UniversityMenuBlock,
  UniversityName,
  UniversityTextBlock,
} from './DashboardPage.styled';
import Chart from '../../components/Chart';
import MenuChatGroup from '../../components/DashboardUniversity/MenuChatGroup';
import UniversityMenuList from '../../components/DashboardUniversity/UniversityMenuList';
import MenuVideos from '../../components/DashboardUniversity/MenuVideos';
import MenuAmbassadors from '../../components/DashboardUniversity/MenuAmbassadors';
import MenuProspects from '../../components/DashboardUniversity/MenuProspects';

export enum ActiveMenu {
  NOT = 'not',
  AMBASSADORS = 'ambassadors',
  PROSPECTS = 'prospects',
  APPROVED_VIDEOS = 'approvedVideos',
  CHAT_GROUP = 'chatGroup',
}

enum UserRole {
  AMBASSADOR = 'ambassador',
  UNIVERSITY = 'university',
}

const DashboardPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(ActiveMenu.NOT);
  const [userRole, setUserRole] = useState<UserRole>();
  const [university, setUniversity] = useState<IUniversity>();
  const [hiddenChildren, setHiddenChildren] = useState(false);

  const { user } = useAppSelector((state) => state.university);

  const activeMenuHandler = (setActive: ActiveMenu) => {
    if (activeMenu === setActive) setActiveMenu(ActiveMenu.NOT);
    else setActiveMenu(setActive);
  };

  useEffect(() => {
    if (user && 'name' in user) {
      setUserRole(UserRole.UNIVERSITY);
      setUniversity(user);
    }
  }, [user]);

  return (
    <Container>
      {userRole === UserRole.UNIVERSITY && university && (
        <>
          <Ellipse left={'299px'} top={'547px'} />
          <Ellipse
            left={'84px'}
            top={'193px'}
            linearGradient={'180deg, rgba(140, 200, 158, 0.8) 0%, #8CC89E 100%'}
          />
          <Ellipse
            left={'1206px'}
            top={'190px'}
            linearGradient={'180deg, rgba(255, 221, 53, 0.8) 0%, #FFDD35 100%'}
          />
          <Ellipse
            left={'752px'}
            top={'46px'}
            linearGradient={'180deg, rgba(155, 213, 228, 0.8) 0%, #9BD5E4 100%'}
          />
          <div>
            <UniversityMenuBlock>
              <UniversityInfo>
                <IconWrapper url={university.image}></IconWrapper>
                <UniversityTextBlock>
                  <UniversityName>
                    {university.name}
                    <LogoWrapper marginLeft='15px'>
                      <Link to={PathRouting.EDIT_PAGE_UNIVERSITY}>
                        <Logo src={edit} width='28px' />
                      </Link>
                    </LogoWrapper>
                  </UniversityName>
                  <UniversityAddress>{university.region}</UniversityAddress>
                </UniversityTextBlock>
              </UniversityInfo>
            </UniversityMenuBlock>
            <Line />

            <UniversityMenuList
              activeMenu={activeMenu}
              activeMenuHandler={activeMenuHandler}
              ambassadorsCount={university.ambassadorsCount || 0}
              approvedVideosCount={university.approvedVideosCount || 0}
              chatGroupCount={university.chatGroupCount || 0}
              prospectsCount={university.prospectsCount || 0}
            />
          </div>

          {activeMenu === ActiveMenu.NOT && <Chart user={'university'} />}
          {activeMenu === ActiveMenu.APPROVED_VIDEOS && <MenuVideos id={university.id} />}
          {activeMenu === ActiveMenu.PROSPECTS && (
            // TODO объеденить ProspectsPendingSearch и ProspectsSearch
            <>
              <MenuProspects
                totalProspects={university.prospectsCount || 0}
                id={university.id}
                setHidden={setHiddenChildren}
                hiddenChildren={hiddenChildren}
              />
            </>
          )}
          {activeMenu === ActiveMenu.AMBASSADORS && user && (
            <>
              <MenuAmbassadors
                id={university.id}
                universityName={user.name}
                totalAmbassadors={university.ambassadorsCount || 0}
                hiddenChildren={hiddenChildren}
                setHidden={setHiddenChildren}
              />
            </>
          )}
          {activeMenu === ActiveMenu.CHAT_GROUP && user && (
            <MenuChatGroup id={university.id} universityName={user.name} />
          )}
        </>
      )}
    </Container>
  );
};

export default DashboardPage;
