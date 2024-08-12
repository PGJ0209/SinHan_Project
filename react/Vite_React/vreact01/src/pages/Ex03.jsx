import { useState } from "react";
const Check = () => {
  const list = ["HTML", "CSS", "JAVASCRIPT"];
  return (
    <>
      <hr />
      <h1>3. 체크확인</h1>
      {list.map((v) => {
        return (
          <>
            <input type="checkbox" /> {v} <br />
          </>
        );
      })}
      <h3>선택결과:</h3>
    </>
  );
};
export default Check;
