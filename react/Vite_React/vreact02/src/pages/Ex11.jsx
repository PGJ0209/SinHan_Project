import axios from "axios";
import { useState } from "react";
const url = "https://api.thecatapi.com/v1/images/search?limit=10";
const Axi = () => {
  const [sdata, setSdata] = useState({ username: "", password: "" });
  const [mydata, setMydata] = useState("");
  const [rdata, setRdata] = useState({});

  const handleInput = (e) => setSdata((pre) => ({ ...pre, [e.target.name]: e.target.value }));

  const sendPost = () => {
    axios.post("/data", sdata).then((res) => console.log(res.data));
  };
  const myApi = () => {
    axios.get("/api").then((res) => setMydata(res.data));
  };
  const getApi = () => {
    axios.get(url).then((res) => setRdata(res.data));
  };
  return (
    <>
      <h1>11. AXIOS로 데이터 통신</h1>
      <div>
        <div>서버로 보내는 값:</div>
        ID: <input type="text" name="username" onChange={handleInput} value={sdata.username} />
        PW: <input type="password" name="password" onChange={handleInput} value={sdata.password} />
        <button onClick={sendPost}>전송</button>
        <div></div>
      </div>
      <hr />
      <div>
        <button onClick={myApi}>내 서버 수신</button>
        <div>내 서버에서 받은 값: </div>
        <div>{mydata}</div>
        <hr />
        <button onClick={getApi}>외부서버 수신</button>
        <div>외부 서버에서 받은 값: </div>
        <div>{JSON.stringify(rdata)}</div>
      </div>
    </>
  );
};
export default Axi;
