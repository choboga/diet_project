import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

// 설문 문항 그룹
export const questionGroups = {
  "식습관 관련": [
    "나는 하루 세 끼를 규칙적으로 먹는다.",
    "나는 아침 식사를 거르는 편이다.",
    "나는 밤늦게 야식을 자주 먹는다.",
    "나는 식사량을 조절하는 습관이 있다.",
    "나는 식사량을 조절하면서 다이어트를 한다.",
    "나는 칼로리를 계산하면서 식사한다.",
    "나는 천천히 씹어 먹는 습관이 있다.",
    "나는 음식을 충분히 씹고 삼킨다.",
    "나는 식사를 즐기면서 한다.",
    "나는 일주일에 외식을 3번 이상 한다.",
    "나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.",
    "나는 건강을 고려하여 식단을 계획한다.",
  ],
  "운동 및 활동 관련": [
    "나는 운동을 꾸준히 하는 편이다.",
    "나는 일주일에 3번 이상 운동한다.",
    "나는 땀을 많이 흘리는 활동을 한다.",
    "나는 하루 7000보 이상 걷는다.",
    "나는 출퇴근 시 걸어 다니는 편이다.",
    "나는 다이어트할 때 주변 사람들의 도움을 받는다.",
    "나는 규칙적으로 식사를 한다.",
    "나는 늦은 밤까지 활동하는 편이다.",
  ],
  "라이프스타일 관련": [
    "나는 하루에 물을 2L 이상 마신다.",
    "나는 스트레스를 받을 때 음식을 먹는 편이다.",
    "나는 다이어트에 실패한 경험이 있다.",
    "나는 매운 음식을 좋아한다.",
    "나는 단 음식을 자주 먹는다.",
    "나는 고기를 즐겨 먹는다.",
    "나는 채소를 자주 섭취한다.",
    "나는 과일을 자주 섭취한다.",
    "나는 유제품(우유, 치즈 등)을 즐겨 먹는다.",
    "나는 해산물을 좋아하는 편이다.",
  ],
  "식이 선호도 관련": [
    "나는 탄수화물이 포함된 음식을 자주 먹는다.",
    "나는 탄수화물 섭취를 줄이려고 노력한다.",
    "나는 지방 함량이 적은 음식을 선호한다.",
    "나는 단백질이 풍부한 음식을 자주 섭취한다.",
    "나는 섬유질이 많은 음식을 선호한다.",
    "나는 설탕이 적은 음식을 선호한다.",
    "나는 음식을 조리할 때 소금을 적게 사용한다.",
    "나는 기름진 음식을 피하는 편이다.",
    "나는 통곡물을 즐겨 먹는다.",
    "나는 콩류(두부, 콩, 된장 등)를 자주 섭취한다.",
  ],
};

export const questions = Object.values(questionGroups).flat();
export const options = ["매우 그렇다", "그렇다", "보통이다", "아니다", "전혀 아니다"];

const Preference = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [answers, setAnswers] = useState(Array(40).fill(null));

  const {
    bmi,
    category,
    birthYear,
    gender,
    height,
    weight,
    mbti = null,
  } = location.state || {};

  const handleSelect = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("모든 항목을 선택해야 합니다!");
      return;
    }

    try {
      // 1. 사용자 데이터 저장
      await axios.post("http://127.0.0.1:8000/save_data", {
        answers,
        bmi,
        category,
        birthYear,
        gender,
        height,
        weight,
        mbti,
      });

      // 2. 다이어트 추천 요청
      const response = await axios.post(
        "https://diet-backend-zdup.onrender.com/predict",
        { answers }
      );

      navigate("/result", {
        state: { diet: response.data.recommended_diet, answers },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("서버 요청 중 오류가 발생했습니다.");
    }
  };

  const totalQuestions = 40;
  const answeredQuestions = answers.filter((a) => a !== null).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  let globalIndex = 0;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-4 sm:p-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-6 sm:mb-8 drop-shadow-md">
        성향 분석
      </h2>

      <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-2xl shadow-xl mb-16 sm:mb-20">
        {Object.keys(questionGroups).map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-4">{group}</h3>
            <div className="space-y-4">
              {questionGroups[group].map((question, index) => {
                const currentIndex = globalIndex++;
                return (
                  <div
                    key={currentIndex}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                  >
                    <p className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                      {currentIndex + 1}. {question}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                            answers[currentIndex] === optIndex
                              ? "bg-blue-500 text-white shadow-md"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          onClick={() => handleSelect(currentIndex, optIndex)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          className="w-full mt-6 sm:mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          onClick={handleSubmit}
        >
          제출하기
        </button>
      </div>

      {/* 진행률 바 */}
      <motion.div
        className="fixed bottom-0 left-0 w-full bg-gray-200/80 backdrop-blur-sm shadow-md z-10 p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-3xl mx-auto">
          <p className="text-sm sm:text-base font-medium text-gray-700 mb-2">
            {totalQuestions}문항 중 {answeredQuestions}문항 완료
          </p>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Preference;
