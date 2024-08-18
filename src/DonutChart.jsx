import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ dataValues, total, labels, backgroundColors }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '70%',  // This creates the donut hole
    plugins: {
      legend: {
        display: false,  // Disable the default legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="donut-chart-container" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '50%' }}>
        <Doughnut data={data} options={options} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {total}
        </div>
      </div>
      <div className="donut-chart-labels" style={{ marginLeft: '20px' }}>
        {labels.map((label, index) => (
          <p key={index} style={{ color: backgroundColors[index] }}>
            {label}: {dataValues[index]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
