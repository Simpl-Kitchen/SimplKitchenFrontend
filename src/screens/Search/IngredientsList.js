import React from "react";
import { View, FlatList } from "react-native";
import styles from "./styles";
import Ingredient from "./Ingredient";

const IngredientsList = ({ ingredients, onPressIngredient, handleAddIngredient }) => {
  const renderItem = ({ item, index }) => {
    if (index % 2 === 0) {
      const secondItem =
        index + 1 < ingredients.length ? ingredients[index + 1] : null;

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
    return null;
  };

  return (
    <FlatList
      data={ingredients}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default IngredientsList;
