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

import { generateUserRecipes, getGeneratedRecipes } from "../../utils/APICalls/SimplKitchen/generateRecipes";

const RecipeCard = ({ recipe }) => {
  return (
    <View style={styles.recipeCard}>
      <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
      <Text style={styles.recipeTitle}>{recipe.title}</Text>
      <Text style={styles.recipeIngredients}>
        {recipe.usedIngredients.join(", ")}
      </Text>
    </View>
  );
};

const RecipeGeneratorScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    handleGenerateRecipes();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGenerateRecipes}
        >
          <Text style={styles.buttonText}>Generate Recipes</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#97DF99"
            style={styles.loadingIndicator}
          />
        ) : (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#97DF99",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  recipeCard: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 4,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recipeIngredients: {
    fontSize: 16,
    marginTop: 10,
  },
  loadingIndicator: {
    marginTop: 30,
  },
});

export default RecipeGeneratorScreen;
