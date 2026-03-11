"use client";

import React, { useEffect, useRef } from "react";
import CustomText from "./shared/CustomText";
import BouncingArrow from "./BouncingArrowWeb";

type Props = {
  onPress: () => void;
};

export default function StartButtonWeb({ onPress }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    try {
      const audio = new Audio("/button-press.mp3");
      audioRef.current = audio;
      audio.play().catch((e) => console.warn("play sound failed", e));
    } catch (e) {
      console.warn("audio error", e);
    }
  };

  const onClick = () => {
    onPress();
    playSound();
  };

  const fontSize = 28;
  const letterSpacingPercentage = 3;
  const letterSpacing = fontSize * (letterSpacingPercentage / 100);

  const styles: { [k: string]: React.CSSProperties } = {
    button: {
      width: 125,
      height: 55,
      display: "inline-flex",
      flexDirection: "row",
      backgroundColor: "white",
      borderWidth: 3.5,
      borderStyle: "solid",
      borderColor: "black",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2,
      cursor: "pointer",
      gap: 8,
      padding: "0 8px",
    },
    text: {
      textTransform: "uppercase",
      fontSize: fontSize,
      letterSpacing: `${letterSpacing}px`,
      textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
      margin: 0,
    },
  };

  return (
    <button onClick={onClick} style={styles.button} aria-label="Start timer">
      <CustomText style={styles.text}>Start</CustomText>
      <BouncingArrow />
    </button>
  );
}
