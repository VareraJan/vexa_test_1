import styled from 'styled-components';

import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';
import share from '../../../assets/img/dashboard/share.svg';

// interface ContainerProps {
//   height?: string;
// }
// export const Container = styled.div<ContainerProps>`
//   min-height: calc(var(--index) * ${(props) => props.height || '336px'});
//   width: calc(var(--index) * 890px);
//   z-index: 100;
// `;

// export const Line = styled.div`
//   width: calc(var(--index) * 882px);
//   height: 0px;
//   margin-bottom: calc(var(--index) * 31px);

//   border: 1px solid #02b0bb;
//   z-index: 100;
// `;

interface TitleProps {
  center?: boolean;
  width?: string;
  fontSize?: string;
}

export const Title = styled.div<TitleProps>`
  ${(props) => (props.width ? `width: calc(var(--index) * ${props.width})` : '')}
  ${(props) => (props.center ? 'text-align: center;' : '')}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * ${(props) => props.fontSize || '16px'});
  // font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
`;

export const ApprovalVideoList = styled.ul`
  margin-top: calc(var(--index) * 16px);
  height: calc(var(--index) * 221px);
  width: calc(var(--index) * 890px);
  display: flex;
  flex-flow: row wrap;

  li {
    height: calc(var(--index) * 89px);
    margin-right: calc(var(--index) * 84px);
    display: flex;
  }
`;

// interface ILogo {
//   pointer?: boolean;
// }
// export const Logo = styled.img<ILogo>`
//   src=${(props) => props.src}
//   padding: 0;
//   width: calc(var(--index) * ${(props) => props.width});
//   ${(props) => (props.pointer ? 'cursor: pointer;' : '')}
//   &:active {transform: translateY(1px);}
// `;

// interface IActionWrapper {
//   width?: string;
//   acceptApproved?: boolean;
//   deleteApproved?: boolean;
//   accept?: boolean;
// }
// export const ActionWrapper = styled.div<IActionWrapper>`
//   width: calc(var(--index) * ${(props) => props.width});
//   height: calc(var(--index) * ${(props) => props.width});
//   ${(props) =>
//     props.acceptApproved
//       ? `position:absolute;top: calc(var(--index) * 55px);left: calc(var(--index) * 57px);
//       background: linear-gradient(180deg, rgba(2, 176, 187, 0.8) 0%, #02B0BB 100%);`
//       : ''}
//   ${(props) =>
//     props.accept
//       ? `background: linear-gradient(180deg, rgba(2, 176, 187, 0.8) 0%, #02B0BB 100%);`
//       : ''}
//   ${(props) =>
//     props.deleteApproved
//       ? `position:absolute;top: calc(var(--index) * 55px);left: calc(var(--index) * -10px);
//       background: linear-gradient(180deg, rgba(255, 92, 0, 0.8) 0%, #FF5C00 100%);`
//       : ''}
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 50%;

//   box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
//   cursor: pointer;

//   &:active {
//     transform: translateY(1px);
//   }
// `;

interface IIconWrapper {
  width?: string;
  url?: string;
}
export const IconWrapper = styled.div<IIconWrapper>`
  position: relative;
  width: calc(var(--index) * ${(props) => props.width || '80px'});
  height: calc(var(--index) * ${(props) => props.width || '80px'});
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.url
      ? `background-image:url(${props.url});
    background-position:center center;
    background-size:cover;
    `
      : ''}
`;

export const ApprovedVideoInfo = styled.div`
  margin-left: calc(var(--index) * 18px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    width: calc(var(--index) * 100px);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: calc(var(--index) * 16px);
    line-height: calc(var(--index) * 20px);
    align-items: center;
    letter-spacing: 0.01em;

    color: #1d1d1d;
  }
  .sub-title {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 400;
    font-size: calc(var(--index) * 12px);
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;

    color: #1d1d1d;
  }
`;

export const HeadLists = styled.div`
  display: flex;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 12px);
  line-height: calc(var(--index) * 15px);

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #1d1d1d;

  .name {
    margin-left: calc(var(--index) * 126px);
    width: calc(var(--index) * 149px);
  }
  .date {
    width: calc(var(--index) * 101px);
  }
  .duration {
    width: calc(var(--index) * 100px);
  }
  .category {
    width: calc(var(--index) * 128px);
  }
  .likes {
    width: calc(var(--index) * 84px);
  }
  .author {
    width: calc(var(--index) * 80px);
  }
  .trash {
    width: calc(var(--index) * 40px);
  }
`;

export const Line2 = styled.div`
  width: calc(var(--index) * 683px);
  height: 0px;
  margin-top: calc(var(--index) * 8px);
  margin-left: calc(var(--index) * 157px);

  border: 1px solid #02b0bb;
`;

interface IAllVideoList {
  width?: string;
}
export const AllVideoList = styled.ul<IAllVideoList>`
  li {
    height: calc(var(--index) * 80px);
    margin-top: calc(var(--index) * 16px);
    margin-left: calc(var(--index) * 11px);
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 400;
    font-size: calc(var(--index) * 12px);
    line-height: calc(var(--index) * 15px);

    display: flex;
    align-items: center;
    letter-spacing: 0.01em;

    color: #1d1d1d;

    .number {
      width: calc(var(--index) * 48px);
    }
    .icon {
      width: calc(var(--index) * 98px);
    }
    .name {
      width: calc(var(--index) * 122px);
    }
    .date {
      width: calc(var(--index) * 101px);
      margin-left: calc(var(--index) * 22px);
    }
    .duration {
      width: calc(var(--index) * 100px);
    }
    .category {
      width: calc(var(--index) * 123px);
    }
    .likes {
      width: calc(var(--index) * 84px);
      padding-left: calc(var(--index) * 15px);
    }
    .author {
      width: calc(var(--index) * 60px);
      font-family: 'Quicksand';
      font-style: normal;
      font-weight: 400;
      font-size: calc(var(--index) * 12px);
      line-height: calc(var(--index) * 15px);
      letter-spacing: 0.01em;
      color: #02b0bb;
      text-decoration: underline;

      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
      &:active {
        transform: translateY(1px);
      }
    }
    .trash {
      margin-left: calc(var(--index) * 10px);
      width: calc(var(--index) * 17px);
      height: calc(var(--index) * 18px);
      background-image: url(${delGrey});
      background-position: center center;
      background-size: cover;
      cursor: pointer;

      &:hover {
        background-image: url(${delOrange});
        background-position: center center;
        background-size: cover;
        transform: scale(1.1);
      }
      &:active {
        transform: translateY(1px);
      }
    }

    .share {
      margin-left: calc(var(--index) * 10px);
      width: calc(var(--index) * 20px);
      height: calc(var(--index) * 20px);
      background-image: url(${share});
      background-position: center center;
      background-size: cover;
      cursor: pointer;

      &:hover {
        filter: invert(100%);
        transform: scale(1.1);
      }
      &:active {
        transform: translateY(1px);
      }
    }
  }
`;

export const NumberVideo = styled.div`
  width: calc(var(--index) * 30px);
  height: calc(var(--index) * 30px);
  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 20px);
`;
