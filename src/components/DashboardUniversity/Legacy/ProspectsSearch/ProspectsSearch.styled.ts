import styled from 'styled-components';

import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';

export const Container = styled.div`
  width: calc(var(--index) * 890px);
  min-height: calc(var(--index) * 112px);
  z-index: 100;
`;

export const Line = styled.div`
  width: calc(var(--index) * 882px);
  // height: 0px;
  // margin-top: calc(var(--index) * 34px);
  margin-bottom: calc(var(--index) * 31px);

  border: 1px solid #02b0bb;
  z-index: 100;
`;

export const Line2 = styled.div`
  width: calc(var(--index) * 882px);
  margin-top: calc(var(--index) * 8px);
  margin-bottom: calc(var(--index) * 25px);

  border: 1px solid #02b0bb;
  z-index: 100;
`;

interface ContentBlocksProps {
  marginBottom?: string;
}

export const SelectStatus = styled.div`
  width: calc(var(--index) * 90px);
  min-height: calc(var(--index) * 25px);

  border-radius: calc(var(--index) * 5px);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);

  color: black;
  background-color: #fdffff;

  div {
    height: calc(var(--index) * 25px);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: #fdffff;
      background-color: #02b0bb;
      cursor: pointer;
    }
  }
`;

export const ContentBlocks = styled.div<ContentBlocksProps>`
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--index) * ${(props) => props.marginBottom || 0});
`;

interface TitleProps {
  width?: string;
  pointer?: boolean;
}

export const Title = styled.div<TitleProps>`
  width: calc(var(--index) * ${(props) => props.width || '170px'});

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
// // todo delete
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

interface SearchResultProps {
  color?: string;
}

export const SearchResult = styled.div<SearchResultProps>`
  height: calc(var(--index) * 48px);
  width: calc(var(--index) * 350px);
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  padding: 0 calc(var(--index) * 10px);
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: calc(var(--index) * 0.25px);

  color: ${(props) => props.color};
`;

export const SearchBlocks = styled.div`
  display: flex;
  align-items: center;
  height: calc(var(--index) * 32px);
  width: calc(var(--index) * 300px);

  border: 1px solid #b2b2b2;
  border-radius: calc(var(--index) * 40px);

  &:focus-within {
    border: 2px solid #02b0bb;
    outline: 0;
  }

  input {
    outline: 0;
    outline-offset: 0;
    height: calc(var(--index) * 18px);
    width: calc(var(--index) * 238px);
    margin-right: calc(var(--index) * 12px);
    margin-left: calc(var(--index) * 17px);

    border: none;

    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 400;
    font-size: calc(var(--index) * 16px);
    line-height: calc(var(--index) * 24px);

    letter-spacing: 0.01em;

    color: #383638;
  }
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

export const HeadLists = styled.ul`
  width: calc(var(--index) * 755px);
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(var(--index) * 44px);

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
    padding-left: calc(var(--index) * 108px);
  }
  .invitedDate {
    width: calc(var(--index) * 240px);
    margin-left: calc(var(--index) * 75px);
  }
  .email {
    width: calc(var(--index) * 40px);
    margin-left: calc(var(--index) * 82px);
  }
  .country {
    width: calc(var(--index) * 60px);
    margin-left: calc(var(--index) * 126px);

  }
  .status {
    width: calc(var(--index) * 74px);
    margin-left: calc(var(--index) * 75px);

  }
  .delete {
    width: calc(var(--index) * 70px);
  }
`;

interface AllStudentsProps {
  marginBottom?: string;
}

export const AllStudents = styled.ul<AllStudentsProps>`
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
    .invitedDate {
      width: calc(var(--index) * 70px);
      margin-left: calc(var(--index) * 35px);
    }
    .email {
      width: calc(var(--index) * 200px);
      margin-left: calc(var(--index) * 20px);
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .country {
      width: calc(var(--index) * 110px);
      text-align: center;
    }
    .status {
      width: calc(var(--index) * 90px);
      margin-left: calc(var(--index) * 35px);
      cursor: pointer;
    }
    .delete {
      width: calc(var(--index) * 17px);
      height: calc(var(--index) * 18px);
      background-image: url(${delGrey});
      background-position: center center;
      background-size: cover;

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
    .reject {
      width: calc(var(--index) * 17px);
      height: calc(var(--index) * 18px);
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
`;
