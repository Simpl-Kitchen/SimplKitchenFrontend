// RecipeScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const RecipeScreen = ({ route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=e44c9f0796b4400ab3a69f1354d139a9`
      );
      const data = await response.json();
      setRecipeDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recipeDetails ? (
        <>
          <Text style={styles.title}>{recipeDetails.title}</Text>
          {recipeDetails.image && (
            <Image source={{ uri: recipeDetails.image }} style={styles.image} />
          )}
          <Text>Servings: {recipeDetails.servings}</Text>
          <Text>Prep Time: {recipeDetails.readyInMinutes} minutes</Text>
          <Text style={styles.title}>Ingredients</Text>
          {recipeDetails.extendedIngredients &&
            recipeDetails.extendedIngredients.map((ingredient, index) => (
              <Text key={index}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </Text>
            ))}
          <Text style={styles.title}>Instructions</Text>
          <Text>
            {recipeDetails.instructions
              ? recipeDetails.instructions
              : "Instructions not available."}
          </Text>
        </>
      ) : (
        <Text>Loading recipe details...</Text>
      )}
    </ScrollView>
  );
}; 


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default RecipeScreen;
