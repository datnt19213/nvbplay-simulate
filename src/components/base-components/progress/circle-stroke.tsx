import React from "react";

export const CircleStroke = () => {
  return (
    <svg height="100" width="100">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="5"
        fill="#ffffffff"
        stroke-dasharray={`${(50 * Math.PI) / 360} 5`}
        stroke-radius="16"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
