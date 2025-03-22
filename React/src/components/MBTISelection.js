import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MBTISelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부 상태

  // 이전 페이지에서 전달된 데이터 가져오기
  const { bmi, category, birthYear, gender, height, weight } = location.state || {
    bmi: 0,
    category: "알 수 없음",
    birthYear: "",
    gender: null,
    height: "",
    weight: "",
  };

  const [selectedMBTI, setSelectedMBTI] = useState({
    IE: null,
    NS: null,
    TF: null,
    PJ: null,
  });

  const handleSelect = (type, value) => {
    setSelectedMBTI(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleComplete = () => {
    if (!selectedMBTI.IE || !selectedMBTI.NS || !selectedMBTI.TF || !selectedMBTI.PJ) {
      alert("MBTI를 모두 선택해주세요!");
      return;
    }

    const mbti = selectedMBTI.IE + selectedMBTI.NS + selectedMBTI.TF + selectedMBTI.PJ;
    navigate("/mbtiresult", { state: { mbti, bmi, category, birthYear, gender, height, weight } });
  };

  // 건너뛰기 버튼 클릭 시 팝업 표시
  const handleSkip = () => {
    setShowPopup(true);
  };

  // 팝업에서 "예" 클릭 시 취향 선택 페이지로 이동
  const handleConfirmSkip = () => {
    navigate("/preference", { state: { bmi, category, birthYear, gender, height, weight } });
  };

  // 팝업에서 "아니오" 클릭 시 팝업 닫기
  const handleCancelSkip = () => {
    setShowPopup(false);
  };

  const buttonClass = (type, value) =>
    `w-20 h-20 text-3xl font-bold rounded-full shadow-lg transition duration-300 ${
      selectedMBTI[type] === value
        ? "bg-purple-500 text-white"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="bg-white bg-opacity-90 backdrop-blur-md p-12 rounded-3xl shadow-2xl max-w-xl w-full text-center">
        <h2 className="text-5xl font-extrabold text-blue-500 mb-8">
          MBTI를 선택해주세요!
        </h2>

        <div className="grid grid-cols-4 gap-4 justify-items-center mb-8">
          <button className={buttonClass("IE", "E")} onClick={() => handleSelect("IE", "E")}>E</button>
          <button className={buttonClass("NS", "N")} onClick={() => handleSelect("NS", "N")}>N</button>
          <button className={buttonClass("TF", "T")} onClick={() => handleSelect("TF", "T")}>T</button>
          <button className={buttonClass("PJ", "P")} onClick={() => handleSelect("PJ", "P")}>P</button>
          <button className={buttonClass("IE", "I")} onClick={() => handleSelect("IE", "I")}>I</button>
          <button className={buttonClass("NS", "S")} onClick={() => handleSelect("NS", "S")}>S</button>
          <button className={buttonClass("TF", "F")} onClick={() => handleSelect("TF", "F")}>F</button>
          <button className={buttonClass("PJ", "J")} onClick={() => handleSelect("PJ", "J")}>J</button>
        </div>

        <div className="flex justify-center gap-6">
          <button
            className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
            onClick={handleSkip}
          >
            건너뛰기
          </button>
          <button
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
            onClick={handleComplete}
          >
            선택 완료
          </button>
        </div>
      </div>

      {/* 팝업 모달 */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <p className="text-lg text-gray-700 mb-2">
              MBTI를 입력하면 본인에게 더욱 적합한
            </p>
            <p className="text-lg text-gray-700 mb-2">
              다이어트 정보를 얻을 수 있습니다.
            </p>
            <p className="text-lg text-red-500 font-semibold mb-4">
              정말 건너뛰시겠습니까?
            </p>
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

export default MBTISelection;