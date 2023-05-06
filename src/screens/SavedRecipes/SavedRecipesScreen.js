import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  getRecipes,
  deleteRecipe,
} from "../../utils/APICalls/SimplKitchen/userRecipes";
import { useFocusEffect } from "@react-navigation/native";
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";

const SavedRecipesScreen = ({ navigation }) => {
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
    const totalCost = item.totalCost?.value / 100;
    const ingredientsText =
      item.usedIngredients && item.missedIngredients
        ? `${item.usedIngredients.length} used, ${item.missedIngredients.length} missing`
        : "Ingredients not available";
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
        <Text style={styles.recipeIngredients}>{ingredientsText}</Text>
        <Text style={styles.totalCost}>
          Cost per Serving:{" "}
          {totalCost ? `$${totalCost.toFixed(2)}` : "Cost not available"}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    fetchData();
    navigation.setOptions({
      drawerLockMode: "locked-closed",
      headerLeft: () => (
        <MenuButton
          title="Menu"
          source={require("../../../assets/icons/menu.png")}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
  }, []);

  const fetchData = async () => {
    // Your fetchData function code here
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

export default SavedRecipesScreen;
