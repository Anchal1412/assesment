import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ total, data }) => {
  const getPercentage = (value) => (value / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-info">
        <div className="total-info">
          <span>Total: {total}</span>
        </div>
        <div className="progress-bar" style={{ width: '100%' }}>
          {data.map((item, index) => (
            <div
              key={index}
              className="progress-bar-segment"
              style={{ width: `${getPercentage(item.value)}%`, backgroundColor: item.color }}
            >
              <span>{item.label}: {item.value}</span>
            </div>
          ))}
        </div>
        <div className="progress-bar-labels">
          {data.map((item, index) => (
            <span key={index} style={{ color: item.color }}>
              {item.label}: {item.value}
            </span>
          ))}
         </div>
      </div>
    </div>
  );
};

export default ProgressBar;
