// Description: This file contains the code for the IngredientScreen component.
// This component is used to display the details of an ingredient.
// The user can click on a recipe to see the details of that recipe.
// The user can also click on the back button to go back to the ingredients screen.


import React, { useLayoutEffect } from "react";
import { FlatList, ScrollView, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getIngredientUrl, getRecipesByIngredient, getCategoryName } from "../../data/MockDataAPI";

export default function IngredientScreen(props) {
  const { navigation, route } = props;

  const ingredientId = route.params?.ingredient;
  const ingredientUrl = getIngredientUrl(ingredientId);
  const ingredientName = route.params?.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
        </View>
      </TouchableHighlight>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: "grey" }}>
        <Image style={styles.photoIngredient} source={{ uri: "" + ingredientUrl }} />
      </View>
      <Text style={styles.ingredientInfo}>Recipes with {ingredientName}:</Text>
      <View>
        <ScrollView vertical showsVerticalScrollIndicator={false} numColumns={2} data={getRecipesByIngredient(ingredientId)} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
      </View>
    </ScrollView>
  );
}
