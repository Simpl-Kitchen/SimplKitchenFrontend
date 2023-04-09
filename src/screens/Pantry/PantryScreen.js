import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";

import styles from "./styles";
import handleAddIngredient from "../Search/SearchScreen";

const { getUsersIngredients } = require("../../utils/APICalls.js");

const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);

  const fetchData = async () => {
    console.log("Inside fetchData");
    try {
      const results = await getUsersIngredients();
      setPantryIngredients(results.ingredients); // set the state to the fetched data
      console.log("results = ", results.ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRemoveIngredient = (index) => {
    const newIngredients = [...pantryIngredients];
    newIngredients.splice(index, 1);
    setPantryIngredients(newIngredients);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => renderItem(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.image }} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableHighlight>
      <Button
        title="Remove"
        color="#841584"
        onPress={() => onRemoveIngredient(index)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {pantryIngredients.map((ingredient) => (
        <View style={styles.ingredientContainer}>
          <Image style={styles.photo} source={{ uri: ingredient.image }} />
          <Text style={styles.title}>{ingredient.name}</Text>
        </View>
      ))}
      {pantryIngredients.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your pantry is empty</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Add Ingredient"
          color="#A8DDA8"
          onPress={() => navigation.navigate("Search", { screen: "Search" })}
        />
      </View>
    </View>
    
  );
};

export default PantryScreen;



  // const onAddIngredient = () => {
  //   const ingredient = route.params?.ingredient;
  //   if (ingredient) {
  //     setPantryIngredients([...pantryIngredients, ingredient]);
  //     handleAddIngredient(ingredient);
  //   }
  // };

  // const onRemoveIngredient = (index) => {
  //   const newPantryIngredients = [...pantryIngredients];
  //   newPantryIngredients.splice(index, 1);
  //   setPantryIngredients(newPantryIngredients);
  // };

