import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // 상태 관리
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // 오류 메시지 상태
  const [errors, setErrors] = useState({
    birthYear: "",
    height: "",
    weight: "",
  });

  // 입력값 검증 함수
  const validateInput = () => {
    let newErrors = { birthYear: "", height: "", weight: "" };
    let isValid = true;

    if (birthYear < 1900 || birthYear > currentYear) {
      newErrors.birthYear = `출생년도는 1900년부터 ${currentYear}년까지 입력 가능합니다.`;
      isValid = false;
    }

    if (height < 100 || height > 250) {
      newErrors.height = "키는 100cm부터 250cm까지 입력 가능합니다.";
      isValid = false;
    }

    if (weight < 20 || weight > 300) {
      newErrors.weight = "몸무게는 20kg부터 300kg까지 입력 가능합니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // BMI 계산 및 군 분류 함수
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1); // 소수점 1자리까지

    let category = "";
    if (bmi < 18.5) {
      category = "저체중";
    } else if (bmi >= 18.5 && bmi < 23) {
      category = "정상";
    } else if (bmi >= 23 && bmi < 25) {
      category = "비만 전 단계";
    } else if (bmi >= 25 && bmi < 30) {
      category = "1단계 비만";
    } else if (bmi >= 30 && bmi < 35) {
      category = "2단계 비만";
    } else {
      category = "3단계 비만";
    }

    return { bmi, category };
  };

  // BMI 확인 버튼 클릭
  const handleSubmit = () => {
    if (validateInput()) {
      const { bmi, category } = calculateBMI();
      navigate("/bmiresult", {
        state: { birthYear, gender, height, weight, bmi, category },
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          사용자 정보를 입력하세요
        </h2>

        {/* 출생년도 입력 */}
        <div className="text-left mb-4">
          <input
            type="number"
            placeholder="출생년도 (예: 2002)"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            className={`w-full p-3 border rounded-lg text-lg focus:ring-2 ${
              errors.birthYear ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.birthYear && (
            <p className="text-red-500 text-sm mt-1 font-light text-left">
              {errors.birthYear}
            </p>
          )}
        </div>

        {/* 성별 선택 */}
        <div className="flex justify-center gap-4 my-4">
          <button
            className={`px-6 py-3 rounded-lg text-lg font-semibold ${
              gender === "남자" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setGender("남자")}
          >
            남자
          </button>
          <button
            className={`px-6 py-3 rounded-lg text-lg font-semibold ${
              gender === "여자" ? "bg-pink-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setGender("여자")}
          >
            여자
          </button>
        </div>

        {/* 키 입력 */}
        <div className="text-left mb-4">
          <input
            type="number"
            placeholder="키 (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`w-full p-3 border rounded-lg text-lg focus:ring-2 ${
              errors.height ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.height && (
            <p className="text-red-500 text-sm mt-1 font-light text-left">
              {errors.height}
            </p>
          )}
        </div>

        {/* 몸무게 입력 */}
        <div className="text-left mb-4">
          <input
            type="number"
            placeholder="몸무게 (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={`w-full p-3 border rounded-lg text-lg focus:ring-2 ${
              errors.weight ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1 font-light text-left">
              {errors.weight}
            </p>
          )}
        </div>

        {/* BMI 확인 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!birthYear || !gender || !height || !weight}
          className={`w-full mt-6 px-6 py-3 text-lg font-semibold rounded-lg transition-all ${
            birthYear && gender && height && weight
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          내 BMI 확인하기!
        </button>
      </div>
    </div>
  );
};

export default UserInfo;