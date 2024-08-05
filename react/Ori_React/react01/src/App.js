import React, { useState } from "react";
import "./App.css";

const images = [
  process.env.PUBLIC_URL + "/scubaprologo1.png",
  process.env.PUBLIC_URL + "/fullfacemask.png",
  process.env.PUBLIC_URL + "/openwater.png",
  process.env.PUBLIC_URL + "/freemedive.png",
];

function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevImage}>
        &#10094;
      </button>
      <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} />
      <button className="next" onClick={nextImage}>
        &#10095;
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="wrap">
      <header>
        <h1>게시판</h1>
      </header>
      <nav>
        <ul>
          <li>
            <a href="https://www.padi.com/ko">PADI</a>
          </li>
          <li>
            <a href="/list">게시글</a>
          </li>
          <li>
            <a href="/mypage">마이페이지</a>
          </li>
          <li>
            <a href="/login">로그인</a>
          </li>
        </ul>
      </nav>
      <section>
        <article>
          <p>안녕하세요 프리미다이빙아카데미 입니다.</p>
          <ImageSlider /> {/* 이미지 슬라이드 쇼 추가 */}
        </article>
      </section>
      <footer>
        <span>
          © PADI 2024 개인 정보 보호 정책 Accessibility @Copyright
          프리미다이빙아카데미 Corp.
        </span>
      </footer>
    </div>
  );
}

export default App;
