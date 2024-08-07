import "./App.css";
import { useState } from "react";
function App() {
  const [text, setText] = useState("안녕하세요.");

  const handleInput = (e) => setText(e.target.value);
  const handleDelete = (e) => setText("");
  return (
    <>
      <div>리액트 시작 03</div>
      <input type="text" onChange={handleInput} value={text} />
      <button onClick={handleDelete}>지우기</button>
      <h3>{text}</h3>
    </>
  );
}

export default App;
