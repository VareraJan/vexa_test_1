import styled from 'styled-components';

export const Container = styled.div`
  width: calc(var(--index) * 890px);
  min-height: calc(var(--index) * 112px);
  z-index: 100;
`;

interface LineProps {
  width?: string;
}
export const Line = styled.div<LineProps>`
  ${(props) =>
    props.width
      ? `width: calc(var(--index) * ${props.width})};margin: auto;`
      : ' calc(var(--index) *882px);'}

  margin-bottom: calc(var(--index) * 21px);

  border: 1px solid #02b0bb;
  z-index: 100;
`;

export const Line2 = styled.div`
  width: calc(var(--index) * 820px);
  margin-top: calc(var(--index) * 8px);
  margin-bottom: calc(var(--index) * 25px);
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #02b0bb;
  z-index: 100;
`;

export const ContentBlocks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--index) * 20px);
  margin-top: calc(var(--index) * 35px);
`;

interface TitleProps {
  width?: string;
  mrl?: string;
  list?: boolean;
}
export const Title = styled.div<TitleProps>`
  width: calc(var(--index) * ${(props) => props.width});
  ${(props) =>
    props.list
      ? `overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;`
      : ''};

  text-align: center;

  margin-left: calc(var(--index) * ${(props) => props.mrl});
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
`;

// export const SearchBlock = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   // align-items: flex-end;
//   margin-bottom: calc(var(--index) * 39px);
//   .search-group {
//     display: flex;
//     align-items: flex-end;
//   }
// `;

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

export const BtnGroup = styled.div`
  display: flex;
  margin-left: calc(var(--index) * 180px);
`;

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

interface BtnProps {
  marginLeft?: string;
}
export const Btn = styled.button<BtnProps>`
  width: calc(var(--index) * 168px);
  height: calc(var(--index) * 30px);
  margin-top: calc(var(--index) * 10px);
  margin-left: calc(var(--index) * ${(props) => props.marginLeft || '0px'});
  // height: calc(var(--index) * 48px);
  background-color: #02b0bb;
  border: 1px solid #02b0bb;
  border-radius: calc(var(--index) * 24px);

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: calc(var(--index) * 0.25px);

  color: #fdffff;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
  }
`;

interface IActionWrapper {
  width?: string;
  acceptr?: boolean;
  delete?: boolean;
}
export const ActionWrapper = styled.div<IActionWrapper>`
  width: calc(var(--index) * ${(props) => props.width});
  height: calc(var(--index) * ${(props) => props.width});
  ${(props) =>
    props.acceptr
      ? `background: linear-gradient(180deg, rgba(2, 176, 187, 0.8) 0%, #02B0BB 100%);margin-right: calc(var(--index) * 5px);`
      : ''}
  ${(props) =>
    props.delete
      ? `background: linear-gradient(180deg, rgba(255, 92, 0, 0.8) 0%, #FF5C00 100%);`
      : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:active {
    transform: translateY(1px);
  }
`;

interface ILogo {
  pointer?: boolean;
}

export const Logo = styled.img<ILogo>`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
  ${(props) => (props.pointer ? 'cursor: pointer;' : '')}
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
  justify-content: space-between;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #1d1d1d;
  .name {
    width: calc(var(--index) * 197px));
    padding-left: calc(var(--index) * 100px);
    padding-right: calc(var(--index) * 30px);
  }
  .email {
    width: calc(var(--index) * 120px);
  }
  .status {
    width: calc(var(--index) * 120px);
  }
  .icon-block {
    width: calc(var(--index) * 67px);
  }
  
`;

interface AllProspectsProps {
  height?: string;
  marginBottom?: string;
}

export const AllProspects = styled.ul<AllProspectsProps>`
  min-height: calc(var(--index) * ${(props) => props.height || '200px'});
  margin-bottom: calc(var(--index) * ${(props) => props.marginBottom || '0px'});
  li {
    margin: auto;
    width: calc(var(--index) * 755px);
    height: calc(var(--index) * 50px);
    margin-bottom: calc(var(--index) * 8px);
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 400;
    font-size: calc(var(--index) * 14px);
    line-height: calc(var(--index) * 15px);

    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;

    color: #1d1d1d;

    .name {
      display: flex;
      align-items: center;
      width: calc(var(--index) * 197px);
    }
    .email {
      width: calc(var(--index) * 120px);
    }
    .status {
      width: calc(var(--index) * 120px);
    }

    .icon-block {
      display: flex;
    }
  }
`;

interface IIconWrapper {
  width?: string;
  add?: boolean;
  borderRadius?: string;
  url?: string;
  mrr?: string;
}
export const IconWrapper = styled.div<IIconWrapper>`
  width: calc(var(--index) * ${(props) => props.width || '44px'});
  height: calc(var(--index) * ${(props) => props.width || '44px'});
  margin-right: calc(var(--index) * ${(props) => props.mrr});
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
