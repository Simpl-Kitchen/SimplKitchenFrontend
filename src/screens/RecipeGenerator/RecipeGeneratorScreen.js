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

import {
  generateUserRecipes,
  getGeneratedRecipes,
} from "../../utils/APICalls/SimplKitchen/generateRecipes";

const RecipeCard = ({ recipe }) => {
  return (
    <TouchableOpacity style={styles.recipeCardContainer} onPress={() => {}}>
      <View style={styles.recipeCard}>
        <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.recipeIngredientsContainer}>
            <Text style={styles.recipeIngredientsText}>Ingredients:</Text>
            <Text style={styles.recipeIngredients}>
              {recipe.usedIngredientCount}/{recipe.usedIngredientCount + recipe.missedIngredientCount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleGenerateRecipes}>
          <Text style={styles.buttonText}>Generate Recipes</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#97DF99"
            style={styles.loadingIndicator}
          />
        ) : (
          <View style={styles.recipeList}>
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </View>
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
  recipeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  recipeCardContainer: {
    width: "48%",
    marginBottom: 20,
    borderRadius: 4,
    overflow: "hidden",
  },
  recipeCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  recipeContent: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recipeIngredientsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipeIngredientsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  recipeIngredients: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 30,
  },
});

export default RecipeGeneratorScreen;
