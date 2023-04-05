import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

const Ingredient = ({ ingredient, onPressIngredient, handleAddIngredient }) => {
  return (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressIngredient(ingredient)}
      style={styles.rowItem}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: ingredient.image }} />
        <Text style={styles.title}>{ingredient.name}</Text>
        <TouchableOpacity
          title="⊕ Add To Pantry"
          color="#0D0C0C"
          onPress={() => handleAddIngredient(ingredient)}
        />
      </View>
    </TouchableHighlight>
  );
};

export default Ingredient;
