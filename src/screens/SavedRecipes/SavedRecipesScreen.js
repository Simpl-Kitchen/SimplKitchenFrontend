import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedRecipesScreen = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    getSavedRecipes();
  }, []);

  const getSavedRecipes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("savedRecipes");
      if (jsonValue !== null) {
        setSavedRecipes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error getting saved recipes:", e);
    }
  };

  const handleDeleteRecipe = async (recipe) => {
    try {
      const newSavedRecipes = savedRecipes.filter(
        (savedRecipe) => savedRecipe.id !== recipe.id
      );
      setSavedRecipes(newSavedRecipes);
      await AsyncStorage.setItem(
        "savedRecipes",
        JSON.stringify(newSavedRecipes)
      );
    } catch (e) {
      console.error("Error deleting saved recipe:", e);
    }
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.recipeContainer}>
      <View style={styles.recipeTitleContainer}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteRecipe(item)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.recipeIngredients}>
        {item.usedIngredientCount}/
        {item.usedIngredientCount + item.missedIngredientCount} Ingredients Used
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Recipes</Text>
      {savedRecipes.length === 0 ? (
        <View style={styles.noRecipesContainer}>
          <Text style={styles.noRecipesText}>No saved recipes yet!</Text>
        </View>
      ) : (
        <FlatList
          data={savedRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id.toString()}
          style={styles.recipeList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  noRecipesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noRecipesText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  recipeList: {
    flex: 1,
    width: "100%",
  },
  recipeContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  recipeTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeIngredients: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SavedRecipesScreen;
