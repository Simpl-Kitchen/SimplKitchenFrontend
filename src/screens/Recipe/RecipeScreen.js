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

  const handleServingsChange = (newServings) => {
    const parsedValue = parseInt(newServings, 10);
    if (!isNaN(parsedValue)) {
      setServings(parsedValue);
    }
  };

  const toggleEditServings = () => {
    setEditServings(!editServings);
  };

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

  const RecipeTab = ({ children }) => (
    <View style={styles.tabContainer}>
      <View style={styles.card}>
        <ScrollView style={styles.tabContent}>{children}</ScrollView>
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
                value={ingredient.original}
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
              <TextInput
                style={styles.ingredientInput}
                value={`${calculateNewAmount(ingredient)} ${ingredient.unit}`}
                onChangeText={(value) =>
                  setEditedIngredients((prev) =>
                    prev.map((prevIngredient, prevIndex) =>
                      prevIndex === index
                        ? {
                            ...prevIngredient,
                            amount: parseFloat(value),
                          }
                        : prevIngredient
                    )
                  )
                }
              />
            </View>
          ))
        : recipeDetails?.extendedIngredients?.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <Text style={styles.ingredientText}>{ingredient.original}</Text>
              <Text style={styles.ingredientText}>
                {`${calculateNewAmount(ingredient)} ${ingredient.unit}`}
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
                <Text style={styles.instructionText}>{instruction.step}</Text>
              </View>
            )
          )}
    </RecipeTab>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
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
      <View style={styles.servingsContainer}>
        <Text style={styles.servingsText}>Servings:</Text>
        {editServings ? (
          <TextInput
            style={styles.servingsInput}
            value={editedServings?.toString()}
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
