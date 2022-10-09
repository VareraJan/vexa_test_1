import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

import plus from '../../assets/img/dashboard/plus.svg';
import plusActive from '../../assets/img/dashboard/plus_active.svg';

const AddChatGroup = styled.div`
  display: flex;
  align-items: center;

  background-color: #ffffff;
`;

interface TitleProps {
  width?: string;
  mrl?: string;
  list?: boolean;
  pointer?: boolean;
}

const Title = styled.div<TitleProps>`
  width: calc(var(--index) * ${(props) => props.width});
  ${(props) =>
    props.list
      ? `overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;`
      : ''};

  margin-left: calc(var(--index) * ${(props) => props.mrl});
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
  ${(props) => (props.pointer ? 'cursor: pointer;' : '')}
  &:active {
    transform: translateY(1px);
  }
`;

interface IIconWrapper {
  width?: string;
  active?: boolean;
  url?: string;
}

const IconWrapper = styled.div<IIconWrapper>`
  width: calc(var(--index) * ${(props) => props.width || '44px'});
  height: calc(var(--index) * ${(props) => props.width || '44px'});
  ${(props) => (props.active ? 'background: #02B0BB' : 'background: #ffffff')};
  border: 1.5px solid #02b0bb;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: calc(var(--index) * 12px);

  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(1px);
  }
`;

const Logo = styled.img`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
`;

interface SubMenuAddProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  title: string;
  isLimit?: boolean;
}

const SubMenuAdd: React.FC<SubMenuAddProps> = ({ isActive, setIsActive, title, isLimit }) => {
  return (
    <AddChatGroup>
      <Title>{title}</Title>
      <IconWrapper onClick={() => (!isLimit ? setIsActive(!isActive) : '')} active={isActive}>
        <Logo src={isActive ? plusActive : plus} />
      </IconWrapper>
    </AddChatGroup>
  );
};

export default SubMenuAdd;
