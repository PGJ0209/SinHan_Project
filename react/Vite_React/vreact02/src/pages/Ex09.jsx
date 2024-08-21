import { useMemo, useState } from "react";
const Cards = (props) => {
  return (
    <div style={{ width: "200px", heigth: "300px", border: "1px solid #ccc", padding: "10px", margin: "10px 20px" }}>
       <img src={props.imageSrc} alt={props.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
      <div>컴포넌트입니다.</div>
      <p>name은:{props.name}</p>
      <p>age는:{props.age}</p>
    </div>
  );
};
const ShowState = ({ number, text }) => {
  const consoleNumber = (number) => {
    console.log(number);
    return number;
  };
  const consoleText = (text) => {
    console.log(text);
    return text;
  };
  return (
    <>
      <p>숫자 : {number}</p>
      <p>글자 : {text}</p>
    </>
  );
};
const useM = () => {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("준비중");
  /* 과도한 연산을 담당*/
  const heavyCalc = () => {
    let s = 0;
    for (let i = 0; i < 2 * 1000 * 1000 * 1000; i++) {
      s += i;
    }
    return s;
  };
  let calc = useMemo(() => {
    return heavyCalc();
  }, []);
  //   let calc = heavyCalc();

  const increaseNum = () => setNumber(number + 1);
  const decreaseNum = () => setNumber(number - 1);
  const handleText = (e) => setText(e.target.value);
  return (
    <>
      <h1>9. 과도한 렌더링 방지</h1>
      <div style={{ display: "flex" }}>
      <Cards name={"Division"} age={"01"} imageSrc="/sp.gif" />
        <Cards name={"슈퍼맨"} age={"11"}imageSrc="/superman.png" />
        <Cards name={"배트맨"} age={"100"} imageSrc="/Batman.png"/>
        <Cards name={"아이언맨"} age={"40"} imageSrc="/ironman1.gif"/>
      </div>
      <div>
        <span>고의로 랙유발 연산: {calc}</span>
        <hr />
        <h2>숫자바꾸기</h2>
        <button onClick={increaseNum}> + </button>
        <button onClick={decreaseNum}> - </button>
        <h2>글자바꾸기</h2>
        <input type="text" placeholder={text} onChange={handleText} />
        <ShowState number={number} text={text} />
      </div>
    </>
  );
};
export default useM;
