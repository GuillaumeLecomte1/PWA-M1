import React from 'react';

const BatteryStatus = ({ batteryLevel }) => {
  return (
    batteryLevel !== null && (
      <div className="battery-status">
        <p>Niveau de batterie : {batteryLevel}%</p>
      </div>
    )
  );
};

export default BatteryStatus;
