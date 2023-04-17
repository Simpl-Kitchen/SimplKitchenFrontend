import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecipeScreen = ({ route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [servings, setServings] = useState(null);
  const [editServings, setEditServings] = useState(false);
  const navigation = useNavigation();

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=e44c9f0796b4400ab3a69f1354d139a9`
      );
      const data = await response.json();
      setRecipeDetails(data);
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
    if (!servings || servings === recipeDetails.servings) {
      return ingredient.amount;
    }

    const newAmount = (ingredient.amount / recipeDetails.servings) * servings;
    return newAmount.toFixed(2);
  };

  return (
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
              value={servings ? servings.toString() : ""}
              onChangeText={handleServingsChange}
              style={styles.servingsInput}
              onBlur={toggleEditServings}
            />
          ) : (
            <TouchableOpacity onPress={toggleEditServings}>
              <Text style={styles.servingsNumber}>
                {servings || recipeDetails.servings}
              </Text>
            </TouchableOpacity>
          )}
          <Text style={styles.servingsText}>
            {" "}
            {"\n"}Prep Time: {recipeDetails.readyInMinutes} minutes {"\n"}
            {"\n"}
          </Text>
          <Text style={styles.title}>{"• "}Ingredients</Text>
          {recipeDetails.extendedIngredients &&
            recipeDetails.extendedIngredients.length > 0 &&
            recipeDetails.extendedIngredients.map((ingredient, index) => (
              <Text key={index}>
                {"‣"} {calculateNewAmount(ingredient)} {ingredient.unit}{" "}
                {ingredient.name} {"\n"}
              </Text>
            ))}

          <Text style={styles.title}>{"• "}Instructions</Text>
          {recipeDetails.analyzedInstructions &&
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
        </>
      ) : (
        <Text>Loading recipe details...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  servingsInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  servingsText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 16,
  },
  servingsNumber: {
    fontSize: 16,
  },
  shoppingListButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  shoppingListButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RecipeScreen;
