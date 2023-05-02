import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";

import GenerateStyles from "./styles";

import { generateUserRecipes, getGeneratedRecipes } from "../../utils/APICalls/SimplKitchen/generateRecipes";



//RecipeCard that takes a single prop called recipe. 
//The component returns a view with two Text components, one displaying the recipe title and one displaying a 
//comma-separated list of the used ingredients in the recipe. 
  //The styles for the view and Text components are defined elsewhere in the code.
const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{recipe.title}</Text>
      <Text style={styles.recipeIngredients}>{recipe.usedIngredients.join(", ")}</Text>
    </View>
  );
};



  //functional component called RecipeGeneratorScreen. 
  //It uses the useState hook to manage an array of recipe objects, 
  //and the useEffect hook to fetch generated recipes when the component mounts. 
  //The fetchGeneratedRecipes function is used to make an asynchronous API call to get generated recipes and 
  //update the state of the component with the fetched recipes. 
  //The handleGenerateRecipes function is used to generate user recipes when the "Generate Recipes" button is pressed
  // and the recipes state is rendered as a list of RecipeCard components inside a ScrollView.
const RecipeGeneratorScreen = () => {
  const [recipes, setRecipes] = useState([]);




  //an asynchronous function named fetchGeneratedRecipes which retrieves generated recipes using the getGeneratedRecipes 
  //function and updates the state by setting the fetched recipes using the setRecipes function. 
  //If an error occurs during the fetching process, the error message is logged to the console.
  const fetchGeneratedRecipes = async () => {
    try {
      const generatedRecipes = await getGeneratedRecipes(); // Get generated recipes
      setRecipes(generatedRecipes.queue); // Update the state with the fetched recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };




  //A function called handleGenerateRecipes that is marked as an asynchronous function with the async keyword. 
  //Within this function, there is a try-catch block that attempts to execute a function called generateUserRecipes()
  //using the await keyword. If there is an error, it is caught and logged to the console with console.error().
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
