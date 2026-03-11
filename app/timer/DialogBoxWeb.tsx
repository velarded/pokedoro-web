"use client";

import React from "react";
import CustomText from "./shared/CustomText";
import BouncingArrow from "./BouncingArrowWeb";

type DialogBoxProps = {
  onPress: () => void;
  children: React.ReactNode;
};

export default function DialogBoxWeb({ onPress, children }: DialogBoxProps) {
  const onPressHandler = () => onPress();

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPress();
    }
  };

  const styles: { [k: string]: React.CSSProperties } = {
    dialogContainer: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      bottom: "10%",
      width: "90%",
      height: 110,
      display: "flex",
      flexDirection: "row",
      borderWidth: 3.15,
      borderStyle: "solid",
      borderColor: "black",
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      cursor: "pointer",
      userSelect: "none",
    },
    whiteBorder: {
      width: "100%",
      height: "100%",
      borderWidth: 2.5,
      borderStyle: "solid",
      borderColor: "white",
      borderRadius: 5,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "#F1E4A0",
    },
    textContainer: {
      width: "90%",
      height: "80%",
      borderColor: "#F1E4A0",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      padding: 10,
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 18,
    },
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onPressHandler}
      onKeyDown={handleKeyDown}
      style={styles.dialogContainer}
      aria-label="Dialog action"
    >
      <div style={styles.whiteBorder}>
        <div style={styles.textContainer}>
          <CustomText style={styles.text}>{children}</CustomText>
          <BouncingArrow />
        </div>
      </div>
    </div>
  );
}
