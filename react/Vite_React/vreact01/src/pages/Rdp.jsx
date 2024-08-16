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

// 해당 코드를 통한 다이빙 계획은 권장하지 않음 (실습용도로만 사용하시오)
// PADI RDP 데이터 (WXYZ RULE, 멀티레벨 다이빙 생략함)
// 해당 테이블의 maxTime을 나타낼 때 NDL (무감압한계)로 나타내시오
// 수면휴식 SI는 권장사항이며 minSurfaceInterval은 실습용도입니다. 착용한 다이빙 컴퓨터의 시간을 꼭 따르십시오.
const RDP_TABLE = {
  10: { maxTime: 219, minSurfaceInterval: 60 },
  12: { maxTime: 130, minSurfaceInterval: 60 },
  20: { maxTime: 45, minSurfaceInterval: 70 },
  30: { maxTime: 20, minSurfaceInterval: 80 },
  40: { maxTime: 9, minSurfaceInterval: 90 },
};

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RDP = () => {
  const [depth, setDepth] = useState(10);
  const [time, setTime] = useState(0);
  const [maxTime, setMaxTime] = useState(null);
  const [surfaceInterval, setSurfaceInterval] = useState(null);

  // 경고문구 (허용시간 초과시 노출)
  const calculateRDP = () => {
    const rdp = RDP_TABLE[depth];
    if (time > rdp.maxTime) {
      alert("경고! 설정된 잠수시간은 해당 수심의 허용 범위보다 높습니다!");
      alert("RDP 테이블을 참고하여 체류 수심을 다시 설정해주세요");
    } else {
      setMaxTime(rdp.maxTime);
      setSurfaceInterval(rdp.minSurfaceInterval);
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
        label: "내가 선택한 잠수시간 ( 단위 : 분 )",
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
          <p>
            최소 수면휴식시간(Surface Interval) 은 {surfaceInterval} 분 입니다.
          </p>

          {/* 그래프 표시 부분 */}
          <Bar data={data} />
          <p>주의! 다이빙 계획시 RDP 테이블의 허용 잠수한계를 넘지 마시오.</p>
        </div>
      )}
    </div>
  );
};

export default RDP;
