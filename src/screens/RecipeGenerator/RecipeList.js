// RecipeList.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeList = ({ recipes }) => {
  return (
    <View>
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          {/* Add more recipe details if needed */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    marginTop: 20,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RecipeList;
