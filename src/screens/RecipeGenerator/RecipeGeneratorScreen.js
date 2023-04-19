import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

import {generateUserRecipes, getGeneratedRecipes} from '../../utils/APICalls/SimplKitchen/generateRecipes'



const RecipeGeneratorScreen = () => {
  const [recipe, setRecipe] = useState(null);

  const generateRecipe = async () => {
    // const API_KEY = "YOUR_API_KEY";
    // const URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;

    // try {
    //   const response = await axios.get(URL);
    //   const data = response.data.recipes[0];
    //   setRecipe(data);
    //   console.log("Recipe generated:", data);
    // } catch (error) {
    //   console.error("Error fetching recipe:", error);
    // }
      console.log("Hello")
      const message = await generateUserRecipes();
      console.log(message)
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={generateRecipe}>
        <Text style={styles.buttonText}>Generate Recipe</Text>
      </TouchableOpacity>
      {recipe && (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
        </View>
      )}
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
  recipeContainer: {
    marginTop: 30,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default RecipeGeneratorScreen;
