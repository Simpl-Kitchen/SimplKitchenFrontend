// this will be a screen with a button at the top that says generate recipe and nothing else

import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

import styles from "./styles";

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


