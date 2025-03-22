import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// MBTI 유형 매칭
const MBTI_TITLES = {
  ISTP: "만능 재주꾼",
  ISFP: "성인군자형",
  INFP: "잔다르크형",
  INTP: "아이디어 뱅크형",
  ESTP: "수완 좋은 사업가형",
  ESFP: "사교적인 유형",
  ENFP: "스파크형",
  ENTP: "변론가형",
  ISTJ: "세상의 소금형",
  ISFJ: "임금 뒤편의 권력형",
  INFJ: "예언자형",
  INTJ: "과학자형",
  ESTJ: "사업가형",
  ESFJ: "친선도모형",
  ENFJ: "언변 능숙형",
  ENTJ: "통솔자형",
};

const MBTIResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 데이터가 전달되지 않았을 경우 리다이렉트
  if (!location.state) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-xl text-center w-[90%] max-w-md sm:max-w-lg md:max-w-xl">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-4">
            ❌ 오류 발생
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            데이터가 정상적으로 전달되지 않았습니다.
          </p>
          <button
            className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate("/mbti")}
          >
            MBTI 재선택
          </button>
        </div>
      </div>
    );
  }

  // 정상적인 데이터 가져오기
  const { bmi, category, mbti, birthYear, gender, height, weight } = location.state;
  const mbtiTitle = MBTI_TITLES[mbti] || "알 수 없는 유형";

  // 군에 따라 색상 설정
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-xl text-center w-[90%] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-4">
          진단 결과
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2">
          방문자님의 BMI는 <span className="font-bold">{bmi}</span>이고, 현재{" "}
          <span className={`font-bold ${getCategoryColor(category)}`}>{category}</span>군에 속해있습니다.
        </p>
        {mbti && (
          <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-2">
            MBTI는 <span className="font-bold text-purple-500">{mbti}</span>로{" "}
            <span className="font-bold text-blue-600">{mbtiTitle}</span>이시군요!
          </p>
        )}
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-4">
          마지막으로 방문자님의 다이어트 취향을 알려주시면
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-700">
          적절한 다이어트 조언을 드릴 수 있습니다!
        </p>

        {/* 버튼 그룹 */}
        <div className="mt-4 sm:mt-6 flex justify-center gap-4">
          <button
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
            onClick={() => navigate("/mbti", { state: { bmi, category, birthYear, gender, height, weight } })}
          >
            MBTI 재선택
          </button>
          <button
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            onClick={() => navigate("/preference")} // ✅ 취향 선택 페이지로 이동 (아직 미구현)
          >
            취향 선택하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MBTIResult;