import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 px-4">
      <div
        className={`w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 
        px-4 sm:px-6 md:px-10 py-8 
        ${isMobile ? "bg-white/20" : "bg-black/60"} 
        backdrop-blur-lg rounded-3xl shadow-2xl text-center`}
      >
        {/* 제목 */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          font-extrabold ${isMobile ? "text-black sm:text-white" : "text-white"} 
          mb-4 sm:mb-6 leading-tight tracking-wide drop-shadow-md`}
        >
          AI 다이어트 도우미
        </h1>

        {/* 설명 */}
        <div
          className={`text-sm sm:text-base lg:text-lg xl:text-xl 
          ${isMobile ? "text-black sm:text-gray-200" : "text-white"} 
          leading-relaxed mb-4 sm:mb-6`}
        >
          <p className="sm:whitespace-nowrap">
            <span className={`font-semibold ${isMobile ? "text-black sm:text-white" : "text-white"}`}>
              신체 정보, MBTI, 음식 및 운동 취향을 분석하여
            </span>
          </p>
          <p className="sm:whitespace-nowrap">
            <span className={`font-semibold ${isMobile ? "text-black sm:text-white" : "text-white"}`}>
              최적의 다이어트 방법을 추천하는 맞춤형 솔루션입니다.
            </span>
          </p>
          <p className="sm:whitespace-nowrap">
            단순한 BMI 계산을 넘어,{" "}
            <span className="text-blue-300 font-semibold italic">
              데이터 기반의 과학적인 다이어트 전략
            </span>
            을 제공합니다.
          </p>
          <p className="sm:whitespace-nowrap">
            지속적인 개선을 통해 더 나은 서비스를 제공합니다.
          </p>
          <p className="mt-2 sm:mt-4">
            <span className="font-semibold text-blue-300 text-sm sm:text-base lg:text-lg">
              문의 및 피드백:
            </span>{" "}
            <a
              href="mailto:choboga0@gmail.com"
              className="text-white font-semibold bg-blue-500 px-2 sm:px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              choboga0@gmail.com 📩
            </a>
          </p>
        </div>

        {/* 버튼 */}
        <button
          onClick={() => navigate("/userinfo")}
          className="px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-4 bg-blue-500 text-white text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          다이어트 시작하기!
        </button>
      </div>
    </div>
  );
};

export default Home;
