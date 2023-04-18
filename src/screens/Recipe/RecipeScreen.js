import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

const RecipeScreen = ({ route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [servings, setServings] = useState(null);
  const [editServings, setEditServings] = useState(false);
  const [editedServings, setEditedServings] = useState(recipeDetails ? recipeDetails.servings : null);
  const [editIngredients, setEditIngredients] = useState(false);
  const [editedIngredients, setEditedIngredients] = useState([]);
  const [editInstructions, setEditInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([]);
  const navigation = useNavigation();

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=e44c9f0796b4400ab3a69f1354d139a9`
      );
      const data = await response.json();
      setRecipeDetails(data);
      setEditedIngredients(data.extendedIngredients);
      setEditedInstructions(data.analyzedInstructions?.[0]?.steps || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const handleServingsChange = (newServings) => {
    setServings(parseInt(newServings, 10));
  };

  const toggleEditServings = () => {
    setEditServings(!editServings);
  };

  const calculateNewAmount = (ingredient) => {
    const servingsToUse = editedServings || (servings ? servings : recipeDetails.servings);
    if (!servingsToUse || servingsToUse === recipeDetails.servings) {
      return ingredient.amount;
    }

    const newAmount = (ingredient.amount / recipeDetails.servings) * servingsToUse;
    return newAmount.toFixed(2);
  };

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
      await AsyncStorage.setItem(`recipe-${recipe.id}`, JSON.stringify(editedRecipe));
      Alert.alert("Recipe saved successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error saving recipe.");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditIngredients(!editIngredients)}>
          <Text style={styles.editButtonText}>Edit Ingredients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditInstructions(!editInstructions)}>
          <Text style={styles.editButtonText}>Edit Instructions</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {recipeDetails ? (
          <>
            <Text style={styles.title}>{recipeDetails.title}</Text>
            {recipeDetails.image && (
              <Image source={{ uri: recipeDetails.image }} style={styles.image} />
            )}
        <Text style={styles.servingsText}>Servings: </Text>
        {editServings ? (
          <TextInput
            keyboardType="numeric"
            value={editedServings ? editedServings.toString() : ''}
            onChangeText={(value) => setEditedServings(parseInt(value, 10))}
            style={styles.servingsInput}
            onBlur={toggleEditServings}
          />
        ) : (
          <TouchableOpacity onPress={toggleEditServings}>
            <Text style={styles.servingsNumber}>
              {editedServings || recipeDetails.servings}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.servingsText}>
          {"\n"}Prep Time: {recipeDetails.readyInMinutes} minutes {"\n"}
          {"\n"}
        </Text>
        <Text style={styles.title}>{"• "}Ingredients</Text>
        {editIngredients ? (
          editedIngredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <TextInput
                style={styles.ingredientInput}
                value={ingredient.original}
                onChangeText={(value) =>
                  setEditedIngredients((prev) =>
                    prev.map((prevIngredient, prevIndex) =>
                      prevIndex === index ? { ...prevIngredient, original: value } : prevIngredient
                    )
                  )
                }
              />
            </View>
          ))
        ) : (
          recipeDetails.extendedIngredients &&
          recipeDetails.extendedIngredients.length > 0 &&
          recipeDetails.extendedIngredients.map((ingredient, index) => (
            <Text key={index}>
              {"‣"} {calculateNewAmount(ingredient)} {ingredient.unit}{" "}
              {ingredient.name} {"\n"}
            </Text>
          ))
        )}
        <Text style={styles.title}>{"• "}Instructions</Text>
        {editInstructions ? (
          editedInstructions.map((step, index) => (
            <View key={index} style={styles.instructionContainer}>
              <Text style={styles.instructionNumber}>{index + 1}.</Text>
              <TextInput
                style={styles.instructionInput}
                value={step.step}
                onChangeText={(value) =>
                  setEditedInstructions((prev) =>
                    prev.map((prevStep, prevIndex) =>
                      prevIndex === index ? { ...prevStep, step: value } : prevStep
                    )
                  )
                }
              />
            </View>
          ))
        ) : recipeDetails.analyzedInstructions &&
          recipeDetails.analyzedInstructions[0] &&
          recipeDetails.analyzedInstructions[0].steps ? (
          recipeDetails.analyzedInstructions[0].steps.map((step, index) => (
            <Text key={index}>
              {index + 1}. {step.step} {"\n"}
            </Text>
          ))
        ) : (
          <Text>Instructions not available.</Text>
        )}
        <TouchableOpacity
          style={styles.shoppingListButton}
          onPress={() =>
            navigation.navigate("ShoppingList", {
              username: "your_username",
              startDate: "2023-04-17",
              endDate: "2023-04-24",
            })
          }
        >
          <Text style={styles.shoppingListButtonText}>
            Add To Shopping List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </>
    ) : (
      <Text>Loading recipe details...</Text>
    )}
  </ScrollView>
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}
  >
    <Text style={styles.backButtonText}>Back</Text>
  </TouchableOpacity>
</View>

);
};

export default RecipeScreen;