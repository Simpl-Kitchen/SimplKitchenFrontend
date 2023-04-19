import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

import { generateUserRecipes, getGeneratedRecipes } from "../../utils/APICalls/SimplKitchen/generateRecipes";

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{recipe.title}</Text>
      <Text style={styles.recipeIngredients}>{recipe.ingredients.join(", ")}</Text>
      <Text style={styles.recipeInstructions}>{recipe.instructions}</Text>
    </View>
  );
};

const RecipeGeneratorScreen = () => {
  const [recipes, setRecipes] = useState([]);

  const generateRecipes = async () => {
    try {
      const generatedRecipes = await getGeneratedRecipes();
      const userRecipes = await generateUserRecipes();
  
      if (!generatedRecipes) {
        console.error("Failed to fetch generatedRecipes");
      }
  
      if (!userRecipes) {
        console.error("Failed to fetch userRecipes");
      }
  
      if (generatedRecipes && userRecipes) {
        const allRecipes = generatedRecipes.concat(userRecipes);
        setRecipes(allRecipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={generateRecipes}>
        <Text style={styles.buttonText}>Generate Recipes</Text>
      </TouchableOpacity>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
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
  recipeInstructions: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default RecipeGeneratorScreen;
