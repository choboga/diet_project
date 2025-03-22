import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // 변경된 부분

// Pages
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import BMIResult from "./pages/BMIResult";
import Preference from "./Preference/Preference";
import Result from "./Result/Result";

// Components
import MBTISelection from "./components/MBTISelection";
import MBTIResult from "./components/MBTIResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/bmiresult" element={<BMIResult />} />
        <Route path="/mbti" element={<MBTISelection />} />
        <Route path="/mbtiresult" element={<MBTIResult />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
