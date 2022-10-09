import React, { useEffect, useRef, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Legend, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Btn,
  BtnGroup,
  ChartContainer,
  Container,
  LegendChart,
  Title as ChartTitle,
} from './Chart.styled';

ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, BarElement, Title, Legend);

const options = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: true,
      color: '#ffffff',
    },
  },
  layout: {
    padding: {
      top: 41,
    },
  },
};

interface ChartProps {
  user: 'student' | 'ambassador' | 'university';
}
const Chart: React.FC<ChartProps> = ({ user }) => {
  const [activeBtn, setActiveBtn] = useState<'week' | 'month' | 'total'>('total');
  const [LegendTitle, setLegendTitle] = useState<string[]>();

  // Option for Chart start ===>>>

  const positionLegendTitleLeft =
    user === 'university' ? [77, 247, 414, 583, 753] : [97, 310, 520, 730];
  const labels = user === 'university' ? ['', '', '', '', ''] : ['', '', '', ''];

  // TODO: заглушка, пока нет откуда взять данные
  const getDataParams = () => {
    if (activeBtn === 'total') return [210, 320, 118, 71, 100];
    else if (activeBtn === 'month') return [170, 290, 88, 51, 70];
    else if (activeBtn === 'week') return [140, 260, 68, 31, 44];
  };

  const dataParams = getDataParams();
  const data = {
    labels,

    datasets: [
      {
        label: 'Students',
        data: dataParams,
        backgroundColor: ['#02B0BB', '#9BD5E4', '#8CC89E', '#9A9A9A', '#377DFF'],
        barThickness: 60,
      },
    ],
  };
  // <<<=== Option for Chart end

  const widthRef = useRef(1);
  const ref: any = useRef();

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (width < 700) widthRef.current = 0.7;
      else widthRef.current = 1;
    }),
  );

  useEffect(() => {
    if (user === 'student')
      setLegendTitle(['Likes', 'Likes per University', 'Views', 'Views per University']);
    else if (user === 'ambassador')
      setLegendTitle(['Approved Videos', 'Rejected Videos', 'Likes', 'Views']);
    else if (user === 'university')
      setLegendTitle([
        'Page Views',
        'Likes',
        'Clicks',
        'Students in Application Phase',
        'Students in Commited Phase',
      ]);
  }, [user]);

  useEffect(() => {
    observer.current.observe(ref.current);
  }, [ref, observer]);

  return (
    <Container ref={ref}>
      <ChartTitle mtop='19px' mbottom='40px'>
        Statistics
      </ChartTitle>
      <BtnGroup>
        <Btn
          width='76px'
          height='26px'
          onClick={() => setActiveBtn('week')}
          active={activeBtn === 'week'}>
          Week
        </Btn>
        <Btn
          width='76px'
          height='26px'
          onClick={() => setActiveBtn('month')}
          active={activeBtn === 'month'}>
          Month
        </Btn>
        <Btn
          width='76px'
          height='26px'
          onClick={() => setActiveBtn('total')}
          active={activeBtn === 'total'}>
          Total
        </Btn>
      </BtnGroup>
      <ChartContainer>
        <Bar
          width={906 * widthRef.current}
          height={240 * widthRef.current}
          options={options}
          data={data}
        />
        {LegendTitle &&
          LegendTitle.map((title, ind) => (
            <LegendChart key={title} top={212} left={positionLegendTitleLeft[ind]}>
              {title}
            </LegendChart>
          ))}
      </ChartContainer>
    </Container>
  );
};

export default Chart;
