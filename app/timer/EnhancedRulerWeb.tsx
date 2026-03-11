"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomText from "./shared/CustomText";
import CustomButton from "./shared/CustomButton";

type Props = {
  minValue?: number;
  maxValue?: number;
  step?: number;
  width?: number;
  height?: number;
  segmentWidth?: number;
  indicatorColor?: string;
  initialValue?: number;
  onValueChange?: (v: number) => void;
};

export default function EnhancedRulerWeb({
  minValue = 1,
  maxValue = 100,
  step = 1,
  width: propWidth,
  height = 80,
  segmentWidth = 30,
  indicatorColor = "#fff",
  initialValue = 25,
  onValueChange,
}: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(initialValue);
  const [width, setWidth] = useState<number>(typeof propWidth === "number" ? propWidth : 0);

  useEffect(() => {
    if (!propWidth) setWidth(window.innerWidth || 800);
    else setWidth(propWidth);
  }, [propWidth]);

  const totalSegments = (maxValue - minValue) + 1;
  const centerOffset = (width / 2) - (segmentWidth / 2);
  const rulerWidth = totalSegments * segmentWidth + centerOffset * 2;

  // initialize scroll
  useEffect(() => {
    const initialScrollX = ((initialValue - minValue) / step) * segmentWidth - centerOffset;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = initialScrollX;
    }
  }, [initialValue, minValue, step, segmentWidth, centerOffset]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const offsetX = (e.currentTarget as HTMLDivElement).scrollLeft;
    const segment = Math.round(offsetX / segmentWidth);
    const value = Math.min(maxValue, Math.max(minValue, minValue + segment * step));
    setSelectedValue(value);
    if (onValueChange) onValueChange(value);
  };

  const renderSegments = () => {
    const segments: React.ReactNode[] = [];
    for (let i = minValue; i <= maxValue; i++) {
      const value = i;
      const isMajorTick = value % (step * 5) === 0;
      const isSelected = i === selectedValue;

      segments.push(
        <div
          key={`segment-${i}`}
          style={{
            width: segmentWidth,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            boxSizing: "border-box",
            scrollSnapAlign: "center",
          }}
        >
          {isMajorTick ? (
            <div style={{ width: 60, display: "flex", justifyContent: "center" }}>
              <CustomText style={{ color: isSelected ? indicatorColor : "#959595", fontSize: isSelected ? 60 : 45, fontWeight: "bold" }}>{value}</CustomText>
            </div>
          ) : (
            <div style={{ height: 60 }} />
          )}

          <div
            style={{
              marginTop: 5,
              borderRadius: 1,
              height: isMajorTick ? 45 : isSelected ? 42 : 28,
              width: isSelected ? 9 : 5,
              backgroundColor: isSelected ? indicatorColor : "#959595",
            }}
          />
        </div>
      );
    }
    return segments;
  };

  const onClose = () => {
    // nothing special here — let parent control visibility if needed
  };

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(5,5,5,0.8)", backdropFilter: "blur(6px)" }} />

      <div style={{ width: Math.min(1000, Math.max(320, width - 40)), display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ position: "relative", height: 170, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              width: "100%",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
            }}
          >
            <div style={{ width: rulerWidth, paddingLeft: centerOffset, paddingRight: centerOffset, display: "flex", gap: 0 }}>
              {renderSegments()}
            </div>
          </div>

          {/* Arrow indicator */}
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-10px)", bottom: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="20" height="15" viewBox="0 0 20 15">
              <g>
                <path d="M9.96393 0.896L4.00056 8.60487V12L16.125 12V8.60487L9.96393 0.896Z" fill="#DE3140" stroke="white" strokeWidth="2.5" />
              </g>
            </svg>
            <div style={{ marginTop: 5, padding: "3px 10px", backgroundColor: "white", borderRadius: 10, border: "1px solid #eee" }}>
              <CustomText style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>{selectedValue}</CustomText>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CustomButton label="Set" onPress={onClose} />
        </div>
      </div>
    </div>
  );
}
