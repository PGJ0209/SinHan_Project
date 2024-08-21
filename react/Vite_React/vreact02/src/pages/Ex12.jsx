import { useRef, useState } from "react";
const Refdata = () => {
  const tstyle = {
    width: "200px",
    background: "lightblue",
  };
  const cstyle = {
    width: "200px",
    margin: "10px",
    height: "6.25em",
    border: "none",
    resize: "none",
    background: "skyblue",
  };
  const [text, setText] = useState({ title: "", content: "" });
  const tInput = useRef();
  const cInput = useRef();
  const checkTxt = () => {
    if (text.title.length < 2) {
      alert("제목을 1자 이상 작성하시오.");
      return
    }
    if (text.content.length < 10){
      alert("내용을 10자 이상 작성하시오.")
    }
    alert("성공적으로 전송 되었습니다.")
  };
  return (
    <>
      <h1>12. useRef으로 DOM 직접 접근</h1>
      <div>
        <h3>메모글 작성</h3>
        <input ref={tInput} type="text" name="title" style={tstyle} value={text.title} onChange={(e) => setText((pre) => ({ ...pre, title: e.target.value }))} />
        <br />
        <textarea ref={cInput} name="content" style={cstyle} value={text.content} onChange={(e) => setText((pre) => ({ ...pre, content: e.target.value }))}></textarea>
        <br />
        <button onClick={checkTxt}>전송</button>
        <div>{JSON.stringify(text)}</div>
      </div>
    </>
  );
};
export default Refdata;
