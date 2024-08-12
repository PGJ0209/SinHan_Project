import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Inp from "./pages/Ex01";
import Sel from "./pages/Ex02";
import Check from "./pages/Ex03";
import Ex04 from "./pages/ex04"; // 올바른 경로로 수정

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/ex01">예제1</Link> |{" "}
      <Link to="/ex02">예제2</Link> | <Link to="/ex03">예제3</Link>|{" "}
      <Link to="/ex04">예제4</Link> {/* Ex04 경로 추가 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex01" element={<Inp />} />
        <Route path="/ex02" element={<Sel />} />
        <Route path="/ex03" element={<Check />} />
        <Route path="/ex04" element={<Ex04 />} /> {/* Ex04 라우트 추가 */}
      </Routes>
    </>
  );
}

export default App;
