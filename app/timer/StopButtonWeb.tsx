"use client";

import React, { useEffect, useRef } from "react";
import CustomText from "./shared/CustomText";
import BouncingArrow from "./BouncingArrowWeb";

type Props = { onPress: () => void };

export default function StopButtonWeb({ onPress }: Props) {
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
      borderWidth: 3.15,
      borderStyle: "solid",
      borderColor: "black",
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2,
      cursor: "pointer",
      padding: 0,
    },
    goldBorder: {
      width: "100%",
      height: "100%",
      borderWidth: 3.15,
      borderStyle: "solid",
      borderColor: "#C8A848",
      backgroundColor: "#C8A848",
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    whiteBorder: {
      width: "100%",
      height: "100%",
      borderWidth: 2.5,
      borderStyle: "solid",
      borderColor: "white",
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "#285068",
      gap: 8,
      padding: "0 8px",
    },
    text: {
      textTransform: "uppercase",
      fontSize,
      letterSpacing: `${letterSpacing}px`,
      color: "white",
      textShadow: "0px 4px 4px rgba(0,0,0,0.25)",
      margin: 0,
    },
  };

  return (
    <button onClick={onClick} style={styles.button} aria-label="Stop timer">
      <div style={styles.goldBorder}>
        <div style={styles.whiteBorder}>
          <CustomText style={styles.text}>Stop</CustomText>
          <BouncingArrow />
        </div>
      </div>
    </button>
  );
}
