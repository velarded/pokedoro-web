"use client";

import React from "react";

type Props = {
  progress: number;
  duration: number;
};

export default function HorseshoeProgressBar({ progress, duration }: Props) {
  const svgWidth = 300;
  const strokeWidth = 25;
  const outlineWidth = strokeWidth + 16;
  const whiteOutlineWidth = strokeWidth + 8;
  const radius = 120;
  const centerX = svgWidth / 2;
  const centerY = svgWidth / 2;
  const startAngle = -225;
  const endAngle = 45;
  const progressColor = "#F9F2F7";
  const backgroundColor = "#99e0b4";

  const degToRad = (d: number) => (d * Math.PI) / 180;

  const getArcPath = () => {
    const x1 = centerX + radius * Math.cos(degToRad(startAngle));
    const y1 = centerY + radius * Math.sin(degToRad(startAngle));
    const x2 = centerX + radius * Math.cos(degToRad(endAngle));
    const y2 = centerY + radius * Math.sin(degToRad(endAngle));
    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const getOutlineArcPath = () => {
    const x1 = centerX + radius * Math.cos(degToRad(startAngle - 2));
    const y1 = centerY + radius * Math.sin(degToRad(startAngle - 2));
    const x2 = centerX + radius * Math.cos(degToRad(endAngle + 2));
    const y2 = centerY + radius * Math.sin(degToRad(endAngle + 2));
    const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const arcLength = (Math.PI * radius * Math.abs(endAngle - startAngle)) / 180;
  const arcInnerLength = (Math.PI * radius * Math.abs(endAngle - startAngle - 2)) / 180;

  const fraction = duration > 0 ? Math.max(0, Math.min(1, progress / duration)) : 0;
  const strokeDashoffset = arcLength * (1 - fraction);

  const arcPath = getArcPath();
  const outlinePath = getOutlineArcPath();

  return (
    <div style={{ width: svgWidth }}>
      <svg height={275} width={svgWidth} style={{ display: "block" }}>
        <g>
          <path d={outlinePath} stroke="#000" strokeWidth={outlineWidth} fill="none" strokeLinecap="square" />
          <path d={arcPath} stroke="#FFF" strokeWidth={whiteOutlineWidth} fill="none" strokeLinecap="square" />
          <path d={arcPath} stroke={backgroundColor} strokeWidth={strokeWidth} fill="none" strokeLinecap="square" />

          <path
            d={arcPath}
            stroke="#000"
            strokeWidth={outlineWidth}
            fill="none"
            strokeDasharray={`${arcLength} ${arcLength * 2}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            style={{ transition: "stroke-dashoffset 500ms linear" }}
          />

          <path
            d={arcPath}
            stroke={progressColor}
            strokeWidth={whiteOutlineWidth}
            fill="none"
            strokeDasharray={`${arcInnerLength} ${arcInnerLength * 2}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            style={{ transition: "stroke-dashoffset 500ms linear" }}
          />
        </g>
      </svg>
    </div>
  );
}
