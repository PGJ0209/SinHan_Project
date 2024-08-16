import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Inp from "./pages/Ex01";
import Sel from "./pages/Ex02";
import Check from "./pages/Ex03.jsx";
import Radio from "./pages/Ex04";
import Arrays from "./pages/Ex05";
import Home from "./pages/Home";
import RDP from "./pages/Rdp"; // RDP 테이블 경로
import RDPv2 from "./pages/RDPv2"; // RDPv2 (Ex06) 경로

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/ex01">메뉴1</Link> |{" "}
      <Link to="/ex02">메뉴2</Link> | <Link to="/ex03">메뉴3</Link>|{" "}
      <Link to="/rdp">RDP</Link> | <Link to="/ex04">Radio</Link> |{" "}
      <Link to="/ex05">Arrays</Link> | <Link to="/RDPv2">RDPv2</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex01" element={<Inp />} />
        <Route path="/ex02" element={<Sel />} />
        <Route path="/ex03" element={<Check />} />
        <Route path="/rdp" element={<RDP />} />
        <Route path="/ex04" element={<Radio />} />
        <Route path="/ex05" element={<Arrays />} />
        <Route path="/rdpv2" element={<RDPv2 />} /> {/* RDPv2 경로 추가 */}
      </Routes>
    </>
  );
}

export default App;
