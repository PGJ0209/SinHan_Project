import { useState } from "react";
import data from "./ex03.js";

const Radio = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleCk = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <>
      <h1>4. 라디오확인</h1>
      {data.map((v, i) => (
        <div key={i}>
          <input
            type="radio"
            name="one"
            value={v}
            onChange={handleCk}
            checked={selectedValue === v}
          />
          {v} <br />
        </div>
      ))}
      <h3>선택된 값: {selectedValue}</h3>
    </>
  );
};

export default Radio;
