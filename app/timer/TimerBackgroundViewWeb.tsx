"use client";

import React from "react";

type Props = {
  timerIsActive?: boolean;
};

export default function TimerBackgroundViewWeb({ timerIsActive = false }: Props) {
  const styles: { [k: string]: React.CSSProperties } = {
    container: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    sectionBase: {
      width: "100%",
      boxSizing: "border-box",
    },
    topSection: {
      flex: "0.495",
      backgroundColor: timerIsActive ? "#385656" : "#68A0A0",
    },
    middleSection: {
      flex: "0.01",
      backgroundColor: timerIsActive ? "#95BDBD" : "#B9D6D6",
    },
    bottomSection: {
      flex: "0.495",
      backgroundColor: timerIsActive ? "#68A0A0" : "#95BCBC",
    },
  };

  return (
    <div style={styles.container} aria-hidden>
      <div style={{ ...styles.sectionBase, ...styles.topSection }} />
      <div style={{ ...styles.sectionBase, ...styles.middleSection }} />
      <div style={{ ...styles.sectionBase, ...styles.bottomSection }} />
    </div>
  );
}
