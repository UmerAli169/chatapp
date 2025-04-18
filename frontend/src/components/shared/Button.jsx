"use client";

import React from "react";



const Button = ({ label, className = "", isLoading = false, ...rest }) => {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200 disabled:opacity-50 ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
