import styled from 'styled-components';

import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';

export const Container = styled.div`
  width: calc(var(--index) * 890px);
  z-index: 100;

  background-color: #ffffff;

  .uploader {
    opacity: 0;
    height: 0;
    width: 0;
    line-height: 0;
    overflow: hidden;
    pading: 0;
    margin: 0;
  }
`;

export const HeadLists = styled.ul`
  width: calc(var(--index) * 800px);
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(var(--index) * 12px);

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 14px);
  line-height: calc(var(--index) * calc(var(--index) * 15px));

  display: flex;
  align-items: center;
  letter-spacing: 0.01em;

  color: #1d1d1d;
  .name {
    display: flex;
    width: calc(var(--index) * 60px));
    margin-left: calc(var(--index) * 140px);
  }
  .description {
    // width: calc(var(--index) * 240px);
    margin-left: calc(var(--index) * 150px);

  }
  .numberOfUsers {
    // width: calc(var(--index) * 40px);
    margin-left: calc(var(--index) * 70px);

  }
  .restrictions {
    // width: calc(var(--index) * 60px);
    margin-left: calc(var(--index) * 40px);

  }
  
`;

export const Line2 = styled.div`
  width: calc(var(--index) * 882px);
  margin-top: calc(var(--index) * 8px);
  margin-bottom: calc(var(--index) * 25px);

  border: 1px solid #02b0bb;
  z-index: 100;
`;

interface ILogo {
  pointer?: boolean;
}

export const Logo = styled.img<ILogo>`
  src=${(props) => props.src}
  padding: 0;
  &:active {transform: translateY(1px);}
  width: calc(var(--index) * ${(props) => props.width});
  ${(props) => (props.pointer ? 'cursor: pointer;' : '')}
`;

interface TitleProps {
  width?: string;
  pointer?: boolean;
  marginTop?: string;
}

export const Title = styled.div<TitleProps>`
  width: calc(var(--index) * ${(props) => props.width || '170px'});

  margin-top: calc(var(--index) * ${(props) => props.marginTop || '0px'});

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

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

// interface ImageWrapperProps {
//   url: string;
// }

// export const ImageWrapper = styled.div<ImageWrapperProps>`
//   display: inline-block;
//   margin-left: calc(var(--index) * 5px);
//   width: calc(var(--index) * 15px);
//   height: calc(var(--index) * 15px);
//   background-image: url(${(props) => props.url});
//   background-position: center center;
//   background-size: cover;

//   cursor: pointer;

//   &:hover {
//     transform: scale(1.1);
//   }

//   &:active {transform: translateY(1px);
// `;

// todo
interface AllChatGroupsProps {
  marginBottom?: string;
}

export const AllChatGroups = styled.ul<AllChatGroupsProps>`
  margin-bottom: calc(var(--index) * ${(props) => props.marginBottom || 0});
  li {
    margin: auto;
    margin-left: calc(var(--index) * 70px);

    // width: calc(var(--index) * 755px);
    height: calc(var(--index) * 50px);
    margin-bottom: calc(var(--index) * 8px);
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 400;
    font-size: calc(var(--index) * 14px);
    line-height: calc(var(--index) * 15px);

    display: flex;
    align-items: center;
    letter-spacing: 0.01em;

    color: #1d1d1d;

    .name {
      display: flex;
      align-items: center;
      width: calc(var(--index) * 205px);
    }
    .description {
      width: calc(var(--index) * 250px);
      margin-left: calc(var(--index) * 35px);
      text-align: center;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .numberOfUsers {
      width: calc(var(--index) * 35px);
      margin-left: calc(var(--index) * 50px);
      text-align: center;
    }
    .restrictions {
      width: calc(var(--index) * 110px);
      margin-left: calc(var(--index) * 70px);
      text-align: center;
    }

    .delete {
      width: calc(var(--index) * 17px);
      height: calc(var(--index) * 18px);
      margin-left: calc(var(--index) * 20px);
      background-image: url(${delGrey});
      background-position: center center;
      background-size: cover;
      cursor: pointer;

      &:hover {
        // filter: invert(70%);
        background-image: url(${delOrange});
        background-position: center center;
        background-size: cover;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
`;

interface IIconWrapper {
  width?: string;
  add?: boolean;
  borderRadius?: string;
  url?: string;
}
export const IconWrapper = styled.div<IIconWrapper>`
  width: calc(var(--index) * ${(props) => props.width || '44px'});
  height: calc(var(--index) * ${(props) => props.width || '44px'});
  margin-right: calc(var(--index) * 33px);
  background: ${(props) => (props.add ? '#02B0BB' : '#ffffff')};
  border: ${(props) => (props.add ? '' : '1.5px solid #8F9090')};
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * ${(props) => props.borderRadius || '20px'});
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.url
      ? `background-image:url(${props.url});
    background-position:center center;
    background-size:cover;`
      : ''}

  &:active {
    transform: translateY(1px);
  }
`;
