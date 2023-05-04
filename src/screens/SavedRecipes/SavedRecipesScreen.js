import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { getRecipes, deleteRecipe } from "../../utils/APICalls/SimplKitchen/userRecipes";
import { useFocusEffect } from '@react-navigation/native';

const SavedRecipesScreen = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const fetchSavedRecipes = async () => {
    try {
      const fetchedRecipes = await getRecipes();
      setSavedRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error getting saved recipes:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedRecipes();
    }, [])
  );

  const handleDeleteRecipe = async (recipe) => {
    try {
      await deleteRecipe(recipe);
      const newSavedRecipes = savedRecipes.filter(
        (savedRecipe) => savedRecipe._id !== recipe._id
      );
      setSavedRecipes(newSavedRecipes);
    } catch (error) {
      console.error("Error deleting saved recipe:", error);
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

      {savedRecipes.length === 0 ? (
        <View style={styles.noRecipesContainer}>
          <Text style={styles.noRecipesText}>No saved recipes yet!</Text>
        </View>
      ) : (
        <FlatList
          data={savedRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item._id}
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
    backgroundColor: "#97DF99",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default SavedRecipesScreen;