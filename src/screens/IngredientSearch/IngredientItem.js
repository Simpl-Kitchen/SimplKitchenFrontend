import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";

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
