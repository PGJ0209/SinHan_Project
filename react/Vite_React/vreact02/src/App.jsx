import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Css from "./pages/Ex06";
import Eff from "./pages/Ex07";
import Home from "./pages/Home";
// import CSS from "./pages/Ex08";
// import CSS from "./pages/Ex09";
// import CSS from "./pages/Ex10";

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/ex06">예제6</Link> |{" "}
      <Link to="/ex07">예제7</Link> | <Link to="/ex06">예제8</Link> |{" "}
      <Link to="/ex06">예제6</Link> | <Link to="/ex06">예제6</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex06" element={<Css />} />
        <Route path="/ex07" element={<Eff />} />
        {/* <Route path="/ex08" element={<Inp />} /> */}
        {/* <Route path="/ex09" element={<Inp />} /> */}
        {/* <Route path="/ex10" element={<Inp />} /> */}
      </Routes>
    </>
  );
}

export default App;
