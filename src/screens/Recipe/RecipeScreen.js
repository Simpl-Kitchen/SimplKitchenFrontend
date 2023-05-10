import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";



// functional component called RecipeScreen that displays the details of a recipe. 
//It receives a route prop that contains the recipe information. 
//The component fetches additional recipe information using two API calls and updates the state variables accordingly. 
//The component also allows the user to edit the servings, ingredients, and instructions of the recipe 
//and save the changes to AsyncStorage. Finally, the component displays the recipe details and 
//allows the user to switch between the ingredients and instructions tabs.
const RecipeScreen = ({ route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [servings, setServings] = useState(null);
  const [editServings, setEditServings] = useState(false);
  const [editedServings, setEditedServings] = useState(
    recipeDetails ? recipeDetails.servings : null
  );
  const [editIngredients, setEditIngredients] = useState(false);
  const [editedIngredients, setEditedIngredients] = useState([]);
  const [editInstructions, setEditInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([]);
  const navigation = useNavigation();



  //function called fetchRecipeDetails that makes two API calls using the fetch function. 
  //The first call retrieves recipe information from the Spoonacular API using an API key and sets the recipe details, 
  //edited ingredients, and edited instructions using the response data. The second call retrieves the recipe summary and 
  //sets additional recipe details using the response data. If there is an error in either API call, it will be caught and
  // logged to the console.
  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=e44c9f0796b4400ab3a69f1354d139a9`
      );
      const data = await response.json();
      setRecipeDetails(data);
      setEditedIngredients(data.extendedIngredients);
      setEditedInstructions(data.analyzedInstructions?.[0]?.steps || []);

      // New API call to get recipe summary
      const summaryResponse = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/summary?apiKey=e44c9f0796b4400ab3a69f1354d139a9`
      );
      const summaryData = await summaryResponse.json();
      setRecipeDetails((prev) => ({
        ...prev,
        summary: summaryData.summary,
        cuisine: summaryData.cuisines?.[0] || "Unknown",
        aggregateLikes: summaryData.aggregateLikes,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);


  // function called handleServingsChange that takes in a parameter called newServings. 
  //It then parses newServings as an integer using parseInt() and checks if the result is not NaN. 
  //If it is a valid integer, it sets the Servings state to the parsed value using setServings().
  const handleServingsChange = (newServings) => {
    const parsedValue = parseInt(newServings, 10);
    if (!isNaN(parsedValue)) {
      setServings(parsedValue);
    }
  };




  const toggleEditServings = () => {
    setEditServings(!editServings);
  };



  //function called calculateNewAmount that takes an object ingredient as an argument. 
  //It calculates the new amount of the ingredient needed based on the number of servings specified. 
  //If no editedServings value is provided, it either uses the servings value or the default recipeDetails.servings value. 
  //If the number of servings is the same as the default, it returns the original ingredient.amount. 
  //Otherwise, it calculates the new amount by dividing the original amount by the default servings 
  //and multiplying it by the new number of servings. The final result is rounded to two decimal places using the toFixed method.
  const calculateNewAmount = (ingredient) => {
    const servingsToUse =
      editedServings || (servings ? servings : recipeDetails.servings);
    if (!servingsToUse || servingsToUse === recipeDetails.servings) {
      return ingredient.amount;
    }

    const newAmount =
      (ingredient.amount / recipeDetails.servings) * servingsToUse;
    return newAmount.toFixed(2);
  };
  

  // function onSave that saves recipe information to local storage. 
  //It retrieves existing recipe data from storage, parses it as JSON if it exists, 
  //and then creates a new object with the edited servings, ingredients, and instructions. 
  //It then saves the new object to storage and displays a success message using Alert.alert(). 
  //If there is an error, it logs the error to the console and displays an error message.
  const onSave = async () => {
    try {
      const existingData = await AsyncStorage.getItem(`recipe-${recipe.id}`);
      const existingRecipe = existingData ? JSON.parse(existingData) : {};
      const editedRecipe = {
        ...existingRecipe,
        servings: editedServings,
        ingredients: editedIngredients,
        instructions: editedInstructions,
      };
      await AsyncStorage.setItem(
        `recipe-${recipe.id}`,
        JSON.stringify(editedRecipe)
      );
      Alert.alert("Recipe saved successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error saving recipe.");
    }
  };

  const [activeTab, setActiveTab] = useState("ingredients");



  //functional component called RecipeTab. 
  //The component takes a single prop called children and returns a view that consists of a card with a scrollable tab content. 
  //The view is styled using CSS-in-JS syntax.
  const RecipeTab = ({ children }) => (
    <View style={styles.tabContainer}>
      <View style={styles.card}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.tabContent}>{children}</View>
        </ScrollView>
      </View>
    </View>
  );

  const ingredientsTab = (
    <RecipeTab>
      {editIngredients
        ? editedIngredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <TextInput
                style={styles.ingredientInput}
                value={`${ingredient.original} (${calculateNewAmount(
                  ingredient
                )} ${ingredient.unit})`}
                onChangeText={(value) =>
                  setEditedIngredients((prev) =>
                    prev.map((prevIngredient, prevIndex) =>
                      prevIndex === index
                        ? { ...prevIngredient, original: value }
                        : prevIngredient
                    )
                  )
                }
              />
            </View>
          ))
        : recipeDetails?.extendedIngredients?.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <Text style={styles.ingredientText}>
                {`${ingredient.original} (${calculateNewAmount(ingredient)} ${
                  ingredient.unit
                })`}
              </Text>
            </View>
          ))}
    </RecipeTab>
  );

  const instructionsTab = (
    <RecipeTab>
      {editInstructions
        ? editedInstructions.map((instruction, index) => (
            <View key={index} style={styles.instructionContainer}>
              <Text style={styles.instructionNumber}>{index + 1}.</Text>
              <TextInput
                style={styles.instructionInput}
                value={instruction.step}
                onChangeText={(value) =>
                  setEditedInstructions((prev) =>
                    prev.map((prevInstruction, prevIndex) =>
                      prevIndex === index
                        ? { ...prevInstruction, step: value }
                        : prevInstruction
                    )
                  )
                }
              />
            </View>
          ))
        : recipeDetails?.analyzedInstructions?.[0]?.steps?.map(
            (instruction, index) => (
              <View key={index} style={styles.instructionContainer}>
                <Text style={styles.instructionNumber}>{index + 1}.</Text>
                <Text style={styles.instructionText}>{instruction.step}</Text>
              </View>
            )
          )}
    </RecipeTab>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{recipe.title}</Text>
        <TouchableOpacity onPress={onSave}>
          <FontAwesome name="save" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: recipeDetails?.image || recipe.image,
          }}
        />
      </View>
      <View style={styles.recipeInfoContainer}>
        {recipeDetails?.readyInMinutes && (
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeInfoText}>Ready in:</Text>
            <Text style={styles.recipeInfoText }>
              {recipeDetails.readyInMinutes} minutes
            </Text>
          </View>
        )}
        {recipeDetails?.pricePerServing && (
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeInfoText}>Price per serving:</Text>
            <Text style={styles.recipeInfoText  }>
              ${(recipeDetails.pricePerServing / 100).toFixed(2)}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.servingsContainer}>
        <Text style={styles.servingsText}>Servings:</Text>
        {editServings ? (
          <TextInput
            style={styles.servingsInput}
            value={editedServings?.toString()}
            keyboardType="numeric"
            onChangeText={(value) => setEditedServings(parseInt(value, 10))}
          />
        ) : (
          <Text style={styles.servingsText}>
            {editedServings || (servings ? servings : recipeDetails?.servings)}
          </Text>
        )}
        <TouchableOpacity onPress={toggleEditServings}>
          <FontAwesome
            name={editServings ? "check" : "edit"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("ingredients")}
        >
          <Text style={styles.tabText}>Ingredients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("instructions")}
        >
          <Text style={styles.tabText}>Instructions</Text>
        </TouchableOpacity>
      </View>
      {activeTab === "ingredients" ? ingredientsTab : instructionsTab}
    </View>
  );
};

export default RecipeScreen;
