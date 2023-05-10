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



  //defines a functional component called RecipeCard. It takes in two props: recipe and onSaveRecipe. 
  //The component renders a recipe card UI with an image, title, ingredient count, and a "Save Recipe" button. 
  //When the button is pressed, it calls the onSaveRecipe function with the recipe object as an argument. 
  //The component uses styles defined elsewhere in the codebase.
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



  //component called RecipeGeneratorScreen, which generates and displays a list of recipes. 
  //It maintains state for the list of recipes (recipes) and a loading indicator (loading). 
  //It defines functions handleGenerateRecipes and handleSaveRecipe for generating new recipes 
  //and saving a recipe to a list of saved recipes, respectively. 
  //The component uses the useEffect hook to call handleGenerateRecipes and set navigation options when the component is mounted. 
  //Finally, the component renders a ScrollView containing a button to generate new recipes and a list of recipe cards. 
  //If loading is true, it displays an activity indicator, otherwise it displays the list of recipe cards.
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


  // function called handleSaveRecipe that takes in a recipe object as a parameter and saves it using the addRecipe function. 
  //If the save is successful, it navigates to the "SavedRecipes" page. 
  //If there's an error, it logs an error message to the console.  
  //The function is defined as asynchronous, which means that it can use the await keyword to wait for the 
  //addRecipe function to finish before continuing. The navigation object is likely from a React Native or React Router library.
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