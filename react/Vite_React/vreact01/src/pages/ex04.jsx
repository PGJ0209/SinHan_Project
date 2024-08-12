import { useState } from "react";

// 간단한 RDP 데이터
const RDP_TABLE = {
  10: { maxTime: 60, minSurfaceInterval: 60 },
  20: { maxTime: 50, minSurfaceInterval: 70 },
  30: { maxTime: 40, minSurfaceInterval: 80 },
  40: { maxTime: 30, minSurfaceInterval: 90 },
  50: { maxTime: 20, minSurfaceInterval: 100 },
};

const Ex04 = () => {
  const [depth, setDepth] = useState(10);
  const [time, setTime] = useState(0);
  const [maxTime, setMaxTime] = useState(null);
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  const calculateRDP = () => {
    const rdp = RDP_TABLE[depth];
    if (time > rdp.maxTime) {
      alert("Time exceeds the recommended limit for this depth!");
    } else {
      setMaxTime(rdp.maxTime);
      setSurfaceInterval(rdp.minSurfaceInterval);
    }
  };

  return (
    <div>
      <h2>Recreational Dive Planner (RDP)</h2>
      <div>
        <label>
          Depth (meters):
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Dive Time (minutes):
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={calculateRDP}>Calculate</button>
      {maxTime !== null && (
        <div>
          <p>
            Maximum Recommended Time at {depth}m: {maxTime} minutes
          </p>
          <p>Minimum Surface Interval: {surfaceInterval} minutes</p>
        </div>
      )}
    </div>
  );
};

export default Ex04;
