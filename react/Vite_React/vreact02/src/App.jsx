import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Css from "./pages/Ex06";
import Eff from "./pages/Ex07";
import FetchData from "./pages/Ex08";
import UseM from "./pages/Ex09";
import Table from "./pages/Ex10";
import Axi from "./pages/Ex11";
import Ref from "./pages/Ex12";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Link to="/">Home</Link> | <Link to="/ex06">예제6</Link> | <Link to="/ex07">예제7</Link> | <Link to="/ex08">예제8</Link> | <Link to="/ex09">예제9</Link> | <Link to="/ex10">예제10</Link> |{" "}
      <Link to="/ex11">예제11</Link> | <Link to="/ex12">예제12</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex06" element={<Css />} />
        <Route path="/ex07" element={<Eff />} />
        <Route path="/ex08" element={<FetchData />} />
        <Route path="/ex09" element={<UseM />} />
        <Route path="/ex10" element={<Table />} />
        <Route path="/ex11" element={<Axi />} />
        <Route path="/ex12" element={<Ref />} />
      </Routes>
    </>
  );
}

export default App;
