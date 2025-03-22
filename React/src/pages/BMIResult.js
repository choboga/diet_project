import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BMIResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const { bmi, category, birthYear, gender, height, weight } = location.state || {
    bmi: 0,
    category: "알 수 없음",
    birthYear: "",
    gender: null,
    height: "",
    weight: "",
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "저체중":
        return "text-blue-500";
      case "정상":
        return "text-green-500";
      case "비만 전 단계":
        return "text-yellow-500";
      case "1단계 비만":
        return "text-orange-500";
      case "2단계 비만":
        return "text-red-500";
      case "3단계 비만":
        return "text-red-700";
      default:
        return "text-gray-500";
    }
  };

  const handleNext = () => {
    navigate("/mbti", { state: { bmi, category, birthYear, gender, height, weight } });
  };

  const handleSkip = () => {
    setShowPopup(true);
  };

  const handleConfirmSkip = () => {
    navigate("/preference", { state: { bmi, category, birthYear, gender, height, weight } });
  };

  const handleCancelSkip = () => {
    setShowPopup(false);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className={`bg-white bg-opacity-90 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl w-full ${isMobile ? 'max-w-md' : 'max-w-2xl'} text-center`}>
        {/* 제목 */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-500 mb-6 sm:mb-8">
          진단 결과
        </h2>

        {/* BMI 결과 */}
        <p className="text-base sm:text-xl mb-4 sm:mb-6">
          방문자님의 BMI는 <span className="font-bold">{bmi}</span>이고 현재{" "}
          <span className={`font-bold ${getCategoryColor(category)}`}>{category}</span>에 속해 있습니다.
        </p>

        <p className="text-base sm:text-xl mb-6">
          MBTI 정보를 입력해주시면<br />
          개인의 취향에 더욱 알맞은 다이어트 조언을 드릴 수 있습니다!
        </p>

        {/* 버튼 */}
        <div className={`flex ${isMobile ? "flex-col gap-y-4" : "flex-row gap-x-6"} justify-center`}>
          <button
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
            onClick={handleSkip}
          >
            건너뛰기
          </button>
          <button
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
            onClick={handleNext}
          >
            MBTI 선택하기
          </button>
        </div>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <p className="text-lg text-gray-700 mb-2">MBTI를 입력하면 본인에게 더욱 적합한</p>
            <p className="text-lg text-gray-700 mb-2">다이어트 정보를 얻을 수 있습니다.</p>
            <p className="text-lg text-red-500 font-semibold mb-4">정말 건너뛰시겠습니까?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                onClick={handleConfirmSkip}
              >
                예
              </button>
              <button
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
                onClick={handleCancelSkip}
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIResult;
