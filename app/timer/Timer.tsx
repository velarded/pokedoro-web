"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./timer.module.css";

type TimerProps = {
  initialSeconds?: number;
};

export default function Timer({ initialSeconds = 25 * 60 }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const initialRef = useRef<number>(initialSeconds);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    initialRef.current = initialSeconds;
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const progress = secondsLeft / initialRef.current;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const arcDegrees = 270; // visible arc from 0 -> 270 degrees
  const arcLength = (arcDegrees / 360) * circumference;
  const dashOffset = arcLength * (1 - progress);
  const outlineRadius = radius + 8;
  const outlineCircumference = 2 * Math.PI * outlineRadius;
  const arcLengthOutline = (arcDegrees / 360) * outlineCircumference;
  const dashOffsetOutline = arcLengthOutline * (1 - progress);
  const innerOutlineRadius = Math.max(6, radius - 8);
  const innerOutlineCircumference = 2 * Math.PI * innerOutlineRadius;
  const arcLengthInnerOutline = (arcDegrees / 360) * innerOutlineCircumference;
  const dashOffsetInner = arcLengthInnerOutline * (1 - progress);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  function toggle() {
    setIsRunning((r) => !r);
  }

  function reset() {
    setIsRunning(false);
    setSecondsLeft(initialRef.current);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.gauge}>
          <svg width="220" height="220" viewBox="0 0 220 220">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8EC19C" />
                <stop offset="100%" stopColor="#A1F7C5" />
              </linearGradient>
            </defs>
            <g transform="translate(110,110) rotate(-135) scale(-1,1)">
              <circle
                r={radius}
                className={styles.track}
                strokeWidth={14}
                fill="none"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="square"
              />
              <circle
                r={outlineRadius}
                stroke="#FFF"
                strokeWidth={6}
                strokeLinecap="square"
                fill="none"
                strokeDasharray={`${arcLengthOutline} ${outlineCircumference}`}
                strokeDashoffset={dashOffsetOutline}
              />
              <circle
                r={innerOutlineRadius}
                stroke="#FFF"
                strokeWidth={6}
                strokeLinecap="square"
                fill="none"
                strokeDasharray={`${arcLengthInnerOutline} ${innerOutlineCircumference}`}
                strokeDashoffset={dashOffsetInner}
              />
              <circle
                r={radius}
                className={styles.progress}
                strokeWidth={14}
                strokeLinecap="square"
                fill="none"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={dashOffset}
                stroke="url(#progressGradient)"
              />
            </g>
          </svg>
          <div className={styles.timeDisplay} aria-live="polite">
            {minutes}:{seconds}
          </div>
        </div>

        <div className={styles.controls}>
          <button className={styles.btn} onClick={toggle} aria-pressed={isRunning}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className={styles.btn} onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
