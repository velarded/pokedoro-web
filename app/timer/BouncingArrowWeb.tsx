"use client";

import React from "react";

export default function BouncingArrowWeb() {
  const styles: { [k: string]: React.CSSProperties } = {
    arrowContainer: {
      width: 20,
      height: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 2px 2px rgba(0,0,0,0.5)",
      // mimic elevation
    },
    svg: {
      display: "block",
      overflow: "visible",
      animation: "bounce 1000ms linear infinite",
    },
    // keyframes added via a style tag below
  };

  return (
    <div style={styles.arrowContainer} aria-hidden>
      <style>{`@keyframes bounce { 0% { transform: translateY(0); } 50% { transform: translateY(-2px); } 100% { transform: translateY(0); } }`}</style>
      <svg width="20" height="10" viewBox="0 0 16.125 11.104" style={styles.svg}>
        <g transform="scale(0.8)">
          <path d="M9.96393 11.104L4.00056 3.39513V0.000107765L16.125 0.000107765V3.39513L9.96393 11.104Z" fill="#DE3140" stroke="white" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}
