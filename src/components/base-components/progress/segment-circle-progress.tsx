import {cn} from "@/lib/utils";
import React from "react";

type ProgressCircleProps = {
  dashCount: number;
  dashColor?: string;
  dashBorderWidth?: number;
  strokeWidth?: number;
  radius?: number;
  gapLength?: number;
  dashColorList?: string[];
  angle?: any;
  className?: string;
  pathClass?: string;
};

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  dashCount,
  dashColor = "black",
  dashBorderWidth = 0,
  strokeWidth = 4,
  radius = 24,
  gapLength = 7,
  dashColorList = [],
  angle = -83,
  className,
  pathClass,
}) => {
  const circumference = 2 * Math.PI * radius;

  const totalGapLength = gapLength * dashCount;
  const totalDashLength = circumference - totalGapLength;

  const dashLength = totalDashLength / dashCount;
  const anglePerDash = (dashLength / circumference) * 360;

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number
  ) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const dashes = [];
  let currentAngle = angle;

  for (let i = 0; i < dashCount; i++) {
    const startAngle = currentAngle;
    const endAngle = startAngle + anglePerDash;

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    const start = polarToCartesian(
      radius + strokeWidth,
      radius + strokeWidth,
      radius,
      startAngle
    );
    const end = polarToCartesian(
      radius + strokeWidth,
      radius + strokeWidth,
      radius,
      endAngle
    );

    dashes.push(
      <path
        className={cn(pathClass)}
        key={i}
        d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`}
        fill="none"
        stroke={dashColorList[i] || dashColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeWidth: dashBorderWidth > 0 ? dashBorderWidth : strokeWidth,
        }}
      />
    );

    currentAngle = endAngle + (gapLength / circumference) * 360;
  }

  return (
    <svg
      className={cn(className)}
      height={radius * 2 + strokeWidth * 2}
      width={radius * 2 + strokeWidth * 2}
    >
      {dashes}
    </svg>
  );
};
