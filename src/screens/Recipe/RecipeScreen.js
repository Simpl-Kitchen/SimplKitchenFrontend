// RecipeScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecipeScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text>Servings: {recipe.servings}</Text>
      <Text>Prep Time: {recipe.readyInMinutes} minutes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default RecipeScreen;
