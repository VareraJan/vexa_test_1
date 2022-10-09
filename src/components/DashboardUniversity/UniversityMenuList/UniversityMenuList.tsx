import React from 'react';
import { ActiveMenu } from '../../../pages/DashboardPage/DashboardPage';
import { Container, IconWrapper, Logo, UniversityMenutextBlock } from './UniversityMenuList.styled';

import mortarboard from '../../../assets/img/dashboard/Mortarboard_light.svg';
import mortarboardActive from '../../../assets/img/dashboard/Mortarboard_lightActive.svg';
import ambassadors from '../../../assets/img/dashboard/ambassadors.svg';
import ambassadorsActive from '../../../assets/img/dashboard/ambassadorsActive.svg';
import video from '../../../assets/img/dashboard/Video.svg';
import videoActive from '../../../assets/img/dashboard/VideoActive.svg';
import chatGroup from '../../../assets/img/dashboard/chat_group.svg';
import chatGroupActive from '../../../assets/img/dashboard/chat_group_active.svg';

interface UniversityMenuListProps {
  activeMenu: ActiveMenu;
  activeMenuHandler: (actMenu: ActiveMenu) => void;
  prospectsCount: number;
  ambassadorsCount: number;
  approvedVideosCount: number;
  chatGroupCount: number;
}

const UniversityMenuList: React.FC<UniversityMenuListProps> = ({
  activeMenu,
  activeMenuHandler,
  ambassadorsCount,
  approvedVideosCount,
  chatGroupCount,
  prospectsCount,
}) => {
  return (
    <Container>
      <div>
        <li>
          <IconWrapper
            onClick={() => activeMenuHandler(ActiveMenu.PROSPECTS)}
            width='100px'
            active={activeMenu === ActiveMenu.PROSPECTS}>
            <Logo
              src={activeMenu === ActiveMenu.PROSPECTS ? mortarboardActive : mortarboard}
              width='60px'
            />
          </IconWrapper>
          <UniversityMenutextBlock>
            <div className='number'>{prospectsCount}</div>
            <div className='menuName'>Prospects</div>
          </UniversityMenutextBlock>
        </li>
        <li>
          <IconWrapper
            onClick={() => activeMenuHandler(ActiveMenu.AMBASSADORS)}
            width='100px'
            active={activeMenu === ActiveMenu.AMBASSADORS}>
            <Logo
              src={activeMenu === ActiveMenu.AMBASSADORS ? ambassadorsActive : ambassadors}
              width='29px'
            />
          </IconWrapper>
          <UniversityMenutextBlock>
            <div className='number'>{ambassadorsCount}</div>
            <div className='menuName'>Ambassadors</div>
          </UniversityMenutextBlock>
        </li>
        <li>
          <IconWrapper
            onClick={() => activeMenuHandler(ActiveMenu.APPROVED_VIDEOS)}
            width='100px'
            active={activeMenu === ActiveMenu.APPROVED_VIDEOS}>
            <Logo
              src={activeMenu === ActiveMenu.APPROVED_VIDEOS ? videoActive : video}
              width='38px'
            />
          </IconWrapper>
          <UniversityMenutextBlock>
            <div className='number'>{approvedVideosCount}</div>
            <div className='menuName'>Approved Videos</div>
          </UniversityMenutextBlock>
        </li>
      </div>
      <div>
        <li>
          <IconWrapper
            onClick={() => activeMenuHandler(ActiveMenu.CHAT_GROUP)}
            width='100px'
            active={activeMenu === ActiveMenu.CHAT_GROUP}>
            <Logo
              src={activeMenu === ActiveMenu.CHAT_GROUP ? chatGroupActive : chatGroup}
              width='40px'
            />
          </IconWrapper>
          <UniversityMenutextBlock>
            <div className='number'>{chatGroupCount}</div>
            <div className='menuName'>Chat Groups</div>
          </UniversityMenutextBlock>
        </li>
      </div>
    </Container>
  );
};

export default UniversityMenuList;
