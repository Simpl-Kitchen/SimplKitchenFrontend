// Description: This file contains the splash screen component
// This component is used to display the splash screen of the app
// The user can see the splash screen for a few seconds before the app loads


import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/SKLogo.png")}
      />
    </View>
  );
}

