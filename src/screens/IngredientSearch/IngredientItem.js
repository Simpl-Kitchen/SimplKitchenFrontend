import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";



//a functional component called IngredientItem that takes three props: ingredient, onPress, and onAdd. 
//The component returns a View element with a TouchableOpacity child that contains an image, a text, and a button. 
//When the image, text, or button are pressed, the corresponding onPress or onAdd function is called with the ingredient 
//prop as an argument. 
//The styles for the component are defined in a separate styles object. The code is likely written in React Native.
const IngredientItem = ({ ingredient, onPress, onAdd }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(ingredient)}
        style={styles.rowItem}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}` }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{ingredient.name}</Text>
          </View>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity onPress={() => onAdd(ingredient)}>
              <AntDesign name="plus" style={styles.addButtonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IngredientItem;
