"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StartButton from "./StartButtonWeb";
import TimerBackgroundView from "./TimerBackgroundViewWeb";
import StopButton from "./StopButtonWeb";
const CustomText: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ children, style }) => (
  <div style={style}>{children}</div>
);
import DialogBox from "./DialogBoxWeb";
import EnhancedRuler from "./EnhancedRulerWeb";
import ResetButton from "./ResetButtonWeb";
import HorseshoeProgressBar from "./HorseshoeProgressBar";

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
  const [mode, setMode] = useState<'pokedoro'|'short'|'long'>('pokedoro');

  function selectMode(m: 'pokedoro'|'short'|'long'){
    setMode(m);
    let dur = 25 * 60;
    if(m === 'short') dur = 5 * 60;
    if(m === 'long') dur = 15 * 60;
    setDuration(dur);
    setProgress(0);
    setTimerIsActive(false);
  }

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
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
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
    topButtonsContainer: {
      position: 'absolute',
      top: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 20,
      zIndex: 2000,
    },
    modeButton: {
      padding: '10px 18px',
      border: '3px solid #000',
      background: '#fff',
      borderRadius: 6,
      fontWeight: 700,
      letterSpacing: 1,
      cursor: 'pointer',
      textTransform: 'uppercase',
    },
    modeButtonActive: {
      boxShadow: 'inset 0 -6px 0 rgba(0,0,0,0.05)'
    }
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
        {/* Top mode buttons */}
        <div style={styles.topButtonsContainer}>
          <button style={{...styles.modeButton, ...(mode==='pokedoro'?styles.modeButtonActive:{} )}} onClick={() => selectMode('pokedoro')}>▶ POKEDORO</button>
          <button style={{...styles.modeButton, ...(mode==='short'?styles.modeButtonActive:{} )}} onClick={() => selectMode('short')}>SHORT BREAK</button>
          <button style={{...styles.modeButton, ...(mode==='long'?styles.modeButtonActive:{} )}} onClick={() => selectMode('long')}>LONG BREAK</button>
        </div>
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
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  {!timerIsActive && <StartButton onPress={startTimer} />}
                  {timerIsActive && <StopButton onPress={stopTimer} />}
                  <ResetButton onClick={resetTimer} />
                </div>
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
