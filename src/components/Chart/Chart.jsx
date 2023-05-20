import { AgChartsReact } from 'ag-charts-react';

const Chart = ({ data }) => {
  const options = {
    data,
    series: [
      {
        type: 'bar',
        xKey: 'macronutrientType',
        yKey: 'consumed',
        normalizedTo: 100,
        stacked: true,
      },
      {
        type: 'bar',
        xKey: 'macronutrientType',
        yKey: 'left',
        normalizedTo: 100,
        stacked: true,
      },
    ],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        label: {
          formatter: (params) => Math.round(params.value) + '%',
        },
      },
      {
        type: 'category',
        position: 'left',
      },
    ]
  };

  return <AgChartsReact options={options} />;

}

export default Chart;