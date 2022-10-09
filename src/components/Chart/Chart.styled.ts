import styled from 'styled-components';

export const Container = styled.div`
  min-height: calc(var(--index) * 310px);
  display: flex;
  flex-direction: column;
`;

export const ChartContainer = styled.div`
  position: relative;
  width: calc(var(--index) * 880px);

  height: calc(var(--index) * 240px);
  background-color: #ffffff;
`;

interface LegendChartProps {
  top?: number;
  left?: number;
}
export const LegendChart = styled.div<LegendChartProps>`
  position: absolute;
  width: 85px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;

  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  text-align: center;
  letter-spacing: 0.01em;

  color: ${(props) => props.color || '#1d1d1d'};
  @media (max-width: 1400px) {
    width: 77px;
    top: calc(0.66 * ${(props) => props.top}px);
    left: calc(0.69 * ${(props) => props.left}px);
    font-size: 9px;
  }
`;

export const BtnGroup = styled.div`
  display: flex;
`;

interface IBtn {
  active?: boolean;
  save?: boolean;
  width?: string;
  height?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}
export const Btn = styled.button<IBtn>`
  width: calc(var(--index) * ${(props) => props.width || '80px'});
  height: calc(var(--index) * ${(props) => props.height || '48px'});
  margin-right: calc(var(--index) * ${(props) => props.marginRight || '12px'});
  margin-left: calc(var(--index) * ${(props) => props.marginLeft});
  margin-bottom: calc(var(--index) * ${(props) => props.marginBottom});

  background: ${(props) => (props.active ? '#02B0BB' : '#FFFFFF')};
  border: 1px solid #d1d1d1;
  border-radius: calc(var(--index) * 50px);

  display: flex;
  justify-content: center;

  cursor: pointer;

  ${(props) =>
    props.save
      ? `font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: calc(var(--index) * 12px);
  line-height: calc(var(--index) * 28px);
  
  letter-spacing: 0.01em;`
      : `font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: calc(var(--index) * 12px);
  line-height: calc(var(--index) * 28px);
  letter-spacing: 0.25px;
  `}

  color: ${(props) => (props.active ? '#FFFFFF' : '#000000')};

  opacity: ${(props) => (props.active ? '' : '0.5')};

  &:active {
    transform: translateY(1px);
  }
`;

interface TitleProps {
  size?: string;
  mtop?: string;
  mbottom?: string;
}

export const Title = styled.div<TitleProps>`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: calc(var(--index) * ${(props) => props.size || '16px'});
  ${(props) => (props.mtop ? `margin-top: calc(var(--index) * ${props.mtop});` : '')}
  ${(props) => (props.mbottom ? `margin-bottom: calc(var(--index) * ${props.mbottom});` : '')}

  line-height: calc(var(--index) * 34px);

  letter-spacing: 0.01em;

  color: #1d1d1d;
`;
