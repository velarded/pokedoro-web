"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HorseshoeProgressBar from "./HorseshoeProgressBar";
import StartButton from "./StartButtonWeb";
import TimerBackgroundView from "./TimerBackgroundViewWeb";
import StopButton from "./StopButtonWeb";
const CustomText: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ children, style }) => (
  <div style={style}>{children}</div>
);
import DialogBox from "./DialogBoxWeb";
import EnhancedRuler from "./EnhancedRulerWeb";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
};

const fontSize = 64;
const letterSpacingPercentage = 5.5;
const letterSpacing = fontSize * (letterSpacingPercentage / 100);

export default function TimerWeb() {
  const router = useRouter();
  const [duration, setDuration] = useState<number>(3);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const [isTimerDone, setIsTimerDone] = useState(false);
  const [visible, setVisible] = useState(true);

  const longPressTimeout = useRef<number | null>(null);
  const LONG_PRESS_MS = 600;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    };
  }, []);

  const startTimer = () => {
    setTimerIsActive(true);
    if (intervalRef.current) return;
    const id = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= duration) {
          showEggHatchingDialogBox();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    intervalRef.current = id;
  };

  const stopTimer = () => {
    setTimerIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const showEggHatchingDialogBox = () => {
    setIsTimerDone(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setVisible(false);
  };

  const changeToEggHatchingScreen = () => {
    router.push("/egg-hatching");
  };

  const resetTimer = () => {
    if (timerIsActive && !isTimerDone) {
      stopTimer();
      setProgress(0);
      setTimerIsActive(false);
    }
  };

  const onSelectedTimerDuration = (selectedTimerDuration: number) => {
    setDuration(selectedTimerDuration * 60);
    setProgress(0);
  };

  const handlePointerDown = () => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    longPressTimeout.current = window.setTimeout(() => {
      resetTimer();
    }, LONG_PRESS_MS) as unknown as number;
  };
  const handlePointerUp = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const remainingTime = formatTime(Math.max(0, duration - progress));

  const styles: { [k: string]: React.CSSProperties } = {
    timerContainer: {
      alignSelf: "stretch",
      position: "relative",
      width: "100%",
      minHeight: "100vh",
    },
    wrapper: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-200px)",
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    },
    contentContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    eggImg: {
      width: 100,
      height: 100,
      zIndex: 9999,
      alignSelf: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-70px)",
    },
    timerContentInfo: {
      display: "flex",
      flexDirection: "column",
      gap: 32,
      transform: "translateY(-30px)",
      alignItems: "center",
    },
    timerText: {
      fontSize: fontSize,
      letterSpacing: `${letterSpacing}px`,
    },
    holdToResetText: {
      fontSize: 32,
      paddingTop: 80,
      color: "rgba(42, 55, 80, 0.6)",
    },
    animated: {
      transition: "opacity 300ms ease",
      opacity: visible ? 1 : 0,
    },
  };

  return (
    <>
      {/* <EnhancedRuler onValueChange={onSelectedTimerDuration} /> */}
      <div
        style={styles.timerContainer}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onContextMenu={(e) => e.preventDefault()}
      >
        <TimerBackgroundView timerIsActive={timerIsActive} />
        <img style={styles.eggImg} src="/pokemon-egg.gif" alt="egg" />
        {isTimerDone && (
          <DialogBox onPress={changeToEggHatchingScreen}>
            Oh?! Your egg is hatching
          </DialogBox>
        )}
        <div style={styles.wrapper}>
          <div style={styles.animated}>
            <HorseshoeProgressBar progress={progress} duration={duration} />
            <div style={styles.contentContainer}>
              <div style={styles.timerContentInfo}>
                <CustomText style={styles.timerText}>{remainingTime}</CustomText>
                {!timerIsActive && <StartButton onPress={startTimer} />}
                {timerIsActive && <StopButton onPress={stopTimer} />}
                {timerIsActive && (
                  <CustomText style={styles.holdToResetText}>Hold to reset</CustomText>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
