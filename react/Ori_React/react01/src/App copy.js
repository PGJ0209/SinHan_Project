import React, { useState } from "react";
import "./App.css";

function App() {
  // useState를 사용하여 폼 데이터를 관리
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  // 입력값이 변경될 때마다 상태 업데이트
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("폼 제출됨: " + JSON.stringify(formData));
    // 이곳에 서버로 데이터를 전송하는 로직 추가
  };

  // 폼 리셋 이벤트 핸들러
  const handleReset = () => {
    setFormData({
      username: "",
      password: "",
      name: "",
      email: "",
    });
  };

  return (
    <div class="login-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="아이디"
          pattern="[A-Za-z0-9]{1,8}"
          value={formData.username}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
          required
        />
        <br />

        <button type="submit">가입하기</button>
        <button type="button" onClick={handleReset}>
          다시입력하기
        </button>
      </form>
    </div>
  );
}

export default App;
