import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

// PADI RDP 데이터 (기초적인 단일 레벨 다이빙, 멀티레벨 다이빙은 제외)
const RDP_TABLE = {
  10: { maxTime: 219, safetyStop: 3 },
  12: { maxTime: 147, safetyStop: 3 },
  14: { maxTime: 98, safetyStop: 3 },
  16: { maxTime: 72, safetyStop: 3 },
  18: { maxTime: 56, safetyStop: 3 },
  20: { maxTime: 45, safetyStop: 3 },
  22: { maxTime: 36, safetyStop: 3 },
  25: { maxTime: 29, safetyStop: 3 },
  30: { maxTime: 20, safetyStop: 3 },
  35: { maxTime: 15, safetyStop: 3 },
  40: { maxTime: 9, safetyStop: 3 },
};

// Chart.js 필수 구성 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Ex06 = () => {
  const [depth, setDepth] = useState(10); // 초기 수심 값
  const [time, setTime] = useState(0); // 초기 시간 값
  const [maxTime, setMaxTime] = useState(null);
  const [safetyStop, setSafetyStop] = useState(null);

  const calculateRDP = () => {
    const rdp = RDP_TABLE[depth];
    if (rdp) {
      if (time > rdp.maxTime) {
        alert("경고! 설정된 잠수시간이 해당 수심의 허용 범위보다 높습니다!");
      } else {
        setMaxTime(rdp.maxTime);
        setSafetyStop(rdp.safetyStop);
      }
    } else {
      alert("해당 수심에 대한 데이터가 없습니다. 다른 수심을 입력해 주세요.");
    }
  };

  // Chart 데이터 구성
  const data = {
    labels: [`${depth}m 수심`],
    datasets: [
      {
        label: "무감압 한계 체류 시간 ( 단위 : 분 )",
        data: [maxTime],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "입력한 잠수시간 ( 단위 : 분 )",
        data: [time],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
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
      <button onClick={calculateRDP}>계산하기</button>
      {maxTime !== null && (
        <div>
          <p>
            {depth}m 수심의 NDL (무감압 한계) 는 {maxTime} 분입니다.
          </p>
          {safetyStop && (
            <p>
              안전 정지 시간은 {safetyStop} 분 입니다. 안전 정지는 수심 5m에서
              실시합니다.
            </p>
          )}

          {/* 그래프 표시 부분 */}
          <Bar data={data} />
          <p>주의사항!</p>
          <p> 다이빙 계획 시 RDP 테이블의 허용 잠수 시간을 넘지 마시오.</p>
          <p>착용한 다이빙 컴퓨터의 수면휴식시간을 따르시오.</p>
        </div>
      )}
    </div>
  );
};

export default Ex06;
