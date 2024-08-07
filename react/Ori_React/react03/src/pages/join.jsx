import "./join.css";
import Cryptojs from "crypto-js";
import { useState } from "react";

function Join() {
  const [oid, setId] = useState("");
  const [encrypt, setEncrypt] = useState("");
  const hashFunction = () => {
    const secretkey = "123456";
    const data = oid;
    const encrypted = Cryptojs.AES.encrypt(
      JSON.stringify(data),
      secretkey
    ).toString();
    setEncrypt(encrypted);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
  });

  // 입력 값이 변경될 때마다 오른쪽에 업데이트해줌
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handle1 = (e) => {
    setId(e.target.value);
  };
  return (
    <>
      <input type="text" onChange={handle1} />
      <div>암호화전:{oid} </div>
      <button onClick={hashFunction}>암호화</button>
      <div>{"===>"}</div>
      <div>암호화후: {encrypt} </div>

      <div className="container">
        {/* 왼쪽 꺼 */}
        <div className="join-container">
          <h2>회원가입</h2>
          <form action="/join" method="POST">
            <label htmlFor="name">이름:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email">이메일:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="아이디"
              pattern="[A-Za-z0-9]{1,8}"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="pw">Password:</label>
            <input
              type="password"
              id="pw"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">가입하기</button>
            <button type="reset" className="reset-btn">
              다시 입력
            </button>
          </form>
        </div>
        <h2>👉</h2>
        {/* 오른쪽 꺼 */}
        <div className="join-container">
          <h2>암호화</h2>
          <form action="/join" method="POST">
            <label htmlFor="name2">이름:</label>
            <input
              type="text"
              id="name2"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email2">이메일:</label>
            <input
              type="text"
              id="email2"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="id2">ID:</label>
            <input
              type="text"
              id="id2"
              name="id"
              placeholder="아이디"
              pattern="[A-Za-z0-9]{1,8}"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="pw2">Password:</label>
            <input
              type="password"
              id="pw2"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">가입하기</button>
            <button type="reset" className="reset-btn">
              다시 입력
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Join;
