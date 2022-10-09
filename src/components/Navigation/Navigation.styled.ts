import styled from 'styled-components';

export const Container = styled.nav`
  width: calc(var(--index) * 1440px);
  height: calc(var(--index) * 190px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdffff;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(var(--index) * 48px);
  width: calc(var(--index) * 1260px);
`;

export const Img = styled.img`
src=${(props) => props.src}
width: calc(var(--index) * 240px);
height: calc(var(--index) * 28px);
`;

export const BtnGroup = styled.div`
  display: flex;
`;

interface IBtn {
  active?: boolean;
}

export const Btn = styled.button<IBtn>`
  padding: calc(var(--index) * 12px) calc(var(--index) * 30px);
  margin: 0 calc(var(--index) * 5px);
  height: calc(var(--index) * 48px);
  background-color: ${(props) => (props.active ? '#02B0BB' : '#FDFFFF')};
  border: 1px solid #02b0bb;
  border-radius: calc(var(--index) * 24px);

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * 16px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: 0.01em;

  color: ${(props) => (props.active ? '#fdffff' : '#02b0bb')};

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
  }
`;
interface IA {
  active?: boolean;
}

export const A = styled.div<IA>`
  margin: 0 calc(var(--index) * 25px);
  font-family: Quicksand;
  font-style: normal;
  font-weight: ${(props) => (props.active ? 700 : 400)};
  font-size: calc(var(--index) * 18px);
  line-height: calc(var(--index) * 24px);

  letter-spacing: 0.01em;
  text-transform: capitalize;

  color: #1d1d1d;
`;
