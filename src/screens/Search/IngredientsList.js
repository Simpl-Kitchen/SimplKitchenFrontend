// Import required modules from React and React Native
import React from "react";
import { View, FlatList } from "react-native";

// Import custom styles for the IngredientsList component
import styles from "./styles";

// Import the Ingredient component
import Ingredient from "./Ingredient";

// Define the IngredientsList functional component
// It takes three props:
// - ingredients: An array of ingredient objects
// - onPressIngredient: A callback function for handling the press event on an ingredient
// - handleAddIngredient: A callback function for handling the addition of an ingredient to the pantry
const IngredientsList = ({ ingredients, onPressIngredient, handleAddIngredient }) => {
  // Define the renderItem function, which will be used by the FlatList component
  const renderItem = ({ item, index }) => {
    // Only render items with even indices to display two items per row
    if (index % 2 === 0) {
       // Determine the second item to display in the same row, if it exists
      const secondItem =
        index + 1 < ingredients.length ? ingredients[index + 1] : null;
       // Render the row containing the two items (or just one, if the second item is null)
      return (
        <View style={styles.rowContainer}>
          <Ingredient
            ingredient={item}
            onPressIngredient={onPressIngredient}
            handleAddIngredient={handleAddIngredient}
          />
          {secondItem && (
            <Ingredient
              ingredient={secondItem}
              onPressIngredient={onPressIngredient}
              handleAddIngredient={handleAddIngredient}
            />
          )}
        </View>
      );
    }

    // For odd indices, do not render anything
    return null;
  };
  // Render the IngredientsList component using a FlatList
  return (
    <FlatList
      data={ingredients}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
// Export the IngredientsList component for use in other components
export default IngredientsList;
