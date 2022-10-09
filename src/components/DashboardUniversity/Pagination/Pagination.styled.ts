import styled from 'styled-components';

export const Container = styled.div`
  margin-top: calc(var(--index) * 16px);
  margin-left: calc(var(--index) * 755px);
  margin-bottom: calc(var(--index) * 62px);
  min-width: calc(var(--index) * 57px);
  height: calc(var(--index) * 15px);
  display: flex;

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: calc(var(--index) * 13px);
  line-height: calc(var(--index) * 15px);

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #1d1d1d;
  div {
    margin-left: calc(var(--index) * 7px);
    margin-right: calc(var(--index) * 7px);
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
