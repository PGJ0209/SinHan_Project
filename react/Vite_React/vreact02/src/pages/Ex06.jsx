import "./Ex06.css";
import myStyle from "./Ex06.module.css";
const Css = () => {
  const style1 = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor: " rgb(204, 232, 204)",
  };
  return (
    <>
      <h1 id="ex6-h1">6. CSS 스타일 적용하기</h1>
      <div style={style1}></div> <hr />
      <div style={{ ...style1, backgroundColor: "skyblue" }}></div>
      <div className={`ex6-div`}></div>
      <hr />
      <div className={myStyle["ex6-div"]}></div>
      <ul>
        <li></li>
      </ul>
    </>
  );
};
export default Css;
