// needs to get ingredients from the database
// needs to display ingredients in a list
// needs to have a button to add ingredients 
// needs to have a button to remove ingredients
// needs to have categories for ingredients (produce, dairy, meat, etc.)
// needs to haev a preset category for ingredients 
// search function for ingredients at the top of screen and barcode scanner 
// needs to have a button to add ingredients to the shopping list
// needs to have a button to add ingredients to the pantry
import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getIngredientName, getAllIngredients } from "../../data/MockDataAPI";

export default function pantryScreen(props) {
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
    <TouchableOpacity style={styles.button} onPress={pantryScreen}>
        <Text style={styles.buttonText}>Add To Pantry</Text>
      </TouchableOpacity>
    navigation.navigate("Pantry", { ingredient, name });
  };
//This adds ingredients to shopping however Dan specifically said "Dont work on that right now...just do what I say and work on the search function"
//   const addIngredientShopping = (item) => {
//     let name = getIngredientName(item.ingredientId);
//     let ingredient = item.ingredientId;
//     <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Add To Shopping</Text>
//       </TouchableOpacity>
//     navigation.navigate("Shopping", { ingredient, name });
//   };

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
