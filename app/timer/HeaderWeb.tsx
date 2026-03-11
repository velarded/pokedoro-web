"use client";

import React from "react";
import CustomText from "./shared/CustomText";

export default function HeaderWeb() {
  const styles: { [k: string]: React.CSSProperties } = {
    header: {
      backgroundColor: "#385655",
      height: 100,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 8px 4px rgba(0,0,0,0.3)",
    },
    text: {
      color: "white",
      fontSize: 24,
    },
  };

  return (
    <header style={styles.header} role="banner">
      <CustomText style={styles.text}>Pokedoro</CustomText>
    </header>
  );
}
