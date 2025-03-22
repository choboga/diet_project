// src/components/CardContainer.js
import React from "react";

const CardContainer = ({ children }) => {
  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-12 rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl text-center">
      {children}
    </div>
  );
};

export default CardContainer;
