// Description: This file contains the code for the IngredientsDetailsScreen component.
// This component is used to display the details of a recipe's ingredients.
// The user can click on an ingredient to see the details of that ingredient.
// The user can also click on the back button to go back to the recipe details screen.

import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getIngredientName, getAllIngredients } from "../../data/MockDataAPI";
import { ScrollView } from "react-native-gesture-handler";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.ingredients;
  const ingredientsArray = getAllIngredients(item);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const onPressIngredient = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const renderIngredient = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressIngredient(item[0])}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: "grey" }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={ingredientsArray} renderItem={renderIngredient} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
