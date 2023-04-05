// Import required modules from React and React Native
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

// Import custom styles for the Ingredient component
import styles from "./styles";

// Define the Ingredient functional component
// It takes three props:
// - ingredient: The ingredient object with details such as name and image
// - onPressIngredient: A callback function for handling the press event on the ingredient
// - handleAddIngredient: A callback function for handling the addition of the ingredient to the pantry
const Ingredient = ({ ingredient, onPressIngredient, handleAddIngredient }) => {
  // Render the Ingredient component
  return (
    // Wrap the ingredient with a TouchableHighlight component for handling
    <TouchableHighlight
    // Set the color for the underlay when the item is pressed
      underlayColor="rgba(73,182,77,0.9)"
       // Call the onPressIngredient callback function with the current ingredient when pressed
      onPress={() => onPressIngredient(ingredient)}
      style={styles.rowItem}
    >
      //Create a View component to display the ingredient's details
      <View style={styles.container}>
      // Display the ingredient's image
        <Image style={styles.photo} source={{ uri: ingredient.image }} />
        // Display the ingredient's name
        <Text style={styles.title}>{ingredient.name}</Text>
        // Add a TouchableOpacity component to handle the addition of the ingredient to the pantry
        <TouchableOpacity
          title="⊕ Add To Pantry"
          color="#0D0C0C"
          // Call the handleAddIngredient callback function with the current ingredient when pressed
          onPress={() => handleAddIngredient(ingredient)}
        />
      </View>
    </TouchableHighlight>
  );
};

// Export the Ingredient component for use in other components
export default Ingredient;
