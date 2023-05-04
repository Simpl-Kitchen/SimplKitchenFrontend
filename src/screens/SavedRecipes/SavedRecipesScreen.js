import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";
import {
  getRecipes,
  deleteRecipe,
} from "../../utils/APICalls/SimplKitchen/userRecipes";
import { useFocusEffect } from "@react-navigation/native";

const SavedRecipesScreen = () => {
  const [savedRecipes, setSavedRecipes] = useState(null);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const fetchedRecipes = await getRecipes();
      console.log("Successfully retrieved recipes:", fetchedRecipes);
      setSavedRecipes(fetchedRecipes.recipes);
    } catch (error) {
      console.error("Error getting saved recipes:", error);
    }
  };

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

  const renderRecipe = ({ item }) => {
    const totalCost = item.totalCost?.amount;
    return (
      <View style={styles.recipeContainer}>
        <View style={styles.recipeTitleContainer}>
          <Text style={styles.recipeTitle}>{item.recipeTitle}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteRecipe(item)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: item.image }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        <Text style={styles.recipeIngredients}>
          {item.usedIngredients && item.missedIngredients ?
            `${item.usedIngredients.length}/${item.usedIngredients.length + item.missedIngredients.length} Ingredients in Pantry` :
            "Ingredients not available"
          }
        </Text>
        <Text style={styles.totalCost}>Total Cost: {totalCost ? `$${totalCost.toFixed(2)}` : "Cost not available"}</Text>
      </View>
    );
  };
  

  if (savedRecipes === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#97DF99" />
      </View>
    );
  }

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
  recipeIngredients: {
    fontSize: 16,
    marginVertical: 5,
  },
  recipePrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recipeImage: {
    height: 200,
    marginVertical: 10,
  },
  totalCost: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default SavedRecipesScreen;