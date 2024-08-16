import { useState } from "react";

const Arrays = () => {
  const [arr, setArr] = useState([]);
  const [indata, setIndata] = useState("");

  const handleInput = (e) => setIndata(e.target.value);

  const handleAdd = () => {
    setArr([...arr, indata]);
    setIndata("");
  };

  const handleDel = () => setArr(arr.slice(0, -1));

  // 배열 비우기 기능
  const handleClear = () => setArr([]);

  return (
    <>
      <h1>5. 어레이 실시간 추가</h1>
      <label htmlFor="inin">배열요소 입력:</label>
      <input type="text" id="inin" onChange={handleInput} value={indata} />
      <button onClick={handleAdd} disabled={!indata}>
        추가
      </button>
      <button onClick={handleDel} disabled={arr.length === 0}>
        제거
      </button>
      <button onClick={handleClear} disabled={arr.length === 0}>
        배열비우기
      </button>
      <div>{arr.length === 0 ? "배열이 비었습니다." : ""}</div>
      <h3>
        {arr.map((v, index) => (
          <span key={index}> {v} </span>
        ))}
      </h3>
    </>
  );
};

export default Arrays;
