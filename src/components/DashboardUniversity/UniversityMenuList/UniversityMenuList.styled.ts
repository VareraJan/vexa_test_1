import styled from 'styled-components';

export const Container = styled.ul`
  min-height: max-content;
  margin-bottom: calc(var(--index) * 31px);
  > div {
    display: flex;
    margin-bottom: calc(var(--index) * 28px);

    li {
      min-width: calc(var(--index) * 240px);
      height: calc(var(--index) * 100px);
      margin-left: calc(var(--index) * 28px);
      display: flex;
    }
  }
`;

interface IIconWrapper {
  width?: string;
  active?: boolean;
  url?: string;
}
export const IconWrapper = styled.div<IIconWrapper>`
  width: calc(var(--index) * ${(props) => props.width || '140px'});
  height: calc(var(--index) * ${(props) => props.width || '140px'});
  ${(props) => (props.active ? 'background: #02B0BB' : 'background: #ffffff')};
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: calc(var(--index) * 30px);
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.url
      ? `background-image:url(${props.url});
    background-position:center center;
    background-size:cover;`
      : ''}

  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const Logo = styled.img`
  src=${(props) => props.src}
  padding: 0;
  width: calc(var(--index) * ${(props) => props.width});
`;

export const UniversityMenutextBlock = styled.div`
  margin-left: calc(var(--index) * 19px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .number {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: calc(var(--index) * 26px);
    line-height: calc(var(--index) * 34px);

    letter-spacing: 0.01em;

    color: #02b0bb;
  }
  .menuName {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: calc(var(--index) * 16px);
    line-height: calc(var(--index) * 34px);

    letter-spacing: 0.01em;

    color: #1d1d1d;
  }
`;
