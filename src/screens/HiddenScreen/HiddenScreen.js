import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function HiddenScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/hidden_image.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
