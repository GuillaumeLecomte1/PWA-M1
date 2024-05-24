import React from 'react';
import './BatteryStatus.css';

const getBatteryClass = (batteryLevel) => {
  if (batteryLevel <= 20) {
    return 'low';
  } else if (batteryLevel <= 50) {
    return 'medium';
  } else {
    return 'high';
  }
};

const BatteryStatus = ({ batteryLevel, isCharging }) => {
  const batteryClass = getBatteryClass(batteryLevel);

  return (
    batteryLevel !== null && (
      <div className="battery-status">
        <div className={`battery-icon ${batteryClass}`} />
        <p>Niveau de batterie : {batteryLevel}%</p>
        {isCharging && <p className="charging">En charge</p>}
      </div>
    )
  );
};

export default BatteryStatus;
