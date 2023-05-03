import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  generateUserRecipes,
  getGeneratedRecipes,
} from "../../utils/APICalls/SimplKitchen/generateRecipes";

const RecipeCard = ({ recipe, onSaveRecipe }) => {

  const handleSaveRecipe = () => {
    onSaveRecipe(recipe);
  };

  return (
    <TouchableOpacity style={styles.recipeCardContainer} onPress={() => {}}>
      <View style={styles.recipeCard}>
        <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.recipeIngredientsContainer}>
            <Text style={styles.recipeIngredientsText}>Ingredients:</Text>
            <Text style={styles.recipeIngredients}>
              {recipe.usedIngredientCount}/{recipe.usedIngredientCount + recipe.missedIngredientCount}
            </Text>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
            <Text style={styles.saveButtonText}>Save Recipe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RecipeGeneratorScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleGenerateRecipes = async () => {
    setLoading(true);
    try {
      await generateUserRecipes();
      const generatedRecipes = await getGeneratedRecipes();
      setRecipes(generatedRecipes.queue);
      setLoading(false);
    } catch (error) {
      console.error("Error generating recipes:", error);
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      const savedRecipes = JSON.parse(await AsyncStorage.getItem('savedRecipes')) || [];
      savedRecipes.push(recipe);
      await AsyncStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      navigation.navigate('SavedRecipes');
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleGenerateRecipes}>
          <Text style={styles.buttonText}>Generate Recipes</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#97DF99"
            style={styles.loadingIndicator}
          />
        ) : (
          <View style={styles.recipeList}>
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} onSaveRecipe={handleSaveRecipe} />
            ))}
          </View>
        )}
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
  recipeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  recipeCardContainer: {
    width: "48%",
    marginBottom: 20,
  },
  recipeCard: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 200,
  },
  recipeContent: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recipeIngredientsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recipeIngredientsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recipeIngredients: {
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#97DF99",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default RecipeGeneratorScreen;