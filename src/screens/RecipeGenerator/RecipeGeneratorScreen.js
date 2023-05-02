import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";

import GenerateStyles from "./styles";

import { generateUserRecipes, getGeneratedRecipes } from "../../utils/APICalls/SimplKitchen/generateRecipes";

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{recipe.title}</Text>
      <Text style={styles.recipeIngredients}>{recipe.usedIngredients.join(", ")}</Text>
    </View>
  );
};

const RecipeGeneratorScreen = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchGeneratedRecipes = async () => {
    try {
      const generatedRecipes = await getGeneratedRecipes(); // Get generated recipes
      setRecipes(generatedRecipes.queue); // Update the state with the fetched recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleGenerateRecipes = async () => {
    try {
      await generateUserRecipes(); // Generate user recipes
    } catch (error) {
      console.error("Error generating recipes:", error);
    }
  };

  useEffect(() => {
    fetchGeneratedRecipes();
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGenerateRecipes}>
        <Text style={styles.buttonText}>Generate Recipes</Text>
      </TouchableOpacity>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#97DF99",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  recipeCard: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  recipeIngredients: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default RecipeGeneratorScreen;
