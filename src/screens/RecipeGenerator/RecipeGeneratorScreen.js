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

import {
  generateUserRecipes,
  getGeneratedRecipes,
} from "../../utils/APICalls/SimplKitchen/generateRecipes";
import MenuButton from "../../components/MenuButton/MenuButton";
import { addRecipe } from "../../utils/APICalls/SimplKitchen/userRecipes";
import styles from "./styles";

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
              {recipe.usedIngredientCount}/
              {recipe.usedIngredientCount + recipe.missedIngredientCount}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveRecipe}
          >
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
      await addRecipe(recipe);
      navigation.navigate("SavedRecipes");
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  useEffect(() => {
    handleGenerateRecipes();
    navigation.setOptions({
      headerLeft: () => (
        <MenuButton
          title="Menu"
          source={require("../../../assets/icons/menu.png")}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      drawerLockMode: "locked-closed",
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleGenerateRecipes}>
          <Text style={styles.buttonText}>Generate Recipes</Text>
        </TouchableOpacity>
        <View style={styles.recipeList}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#97DF99"
              style={styles.loadingIndicator}
            />
          ) : (
            <>
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  onSaveRecipe={handleSaveRecipe}
                />
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeGeneratorScreen;