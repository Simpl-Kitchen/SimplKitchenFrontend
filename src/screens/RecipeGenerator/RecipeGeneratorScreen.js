// this will be a screen with a button at the top that says generate recipe and nothing else

import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const RecipeGeneratorScreen = () => {
  const handleGenerateRecipe = () => {
    // TODO: Implement recipe generation logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recipe Generator</Text>
        <Text style={styles.clearButton} onPress={handleGenerateRecipe}>
          Generate Recipe
        </Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Button
          style = {styles.Button}
          title="Generate Recipe"
          onPress={handleGenerateRecipe}
          color="#A8DDA8"
        />
      </View>
    </View>
  );
};

export default RecipeGeneratorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ButtonContainer: {
    backgroundColor: "#A8DDA8",
  },
  Button: {
    backgroundColor: "#A8DDA8",
    borderRadius: 10,
  },
});
