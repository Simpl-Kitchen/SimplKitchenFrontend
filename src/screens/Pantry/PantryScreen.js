import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

import styles from "./styles";
import handleAddIngredient from "../Search/SearchScreen";

const { getUsersIngredients, removeIngredientFromPantry } = require("../../utils/APICalls.js");

const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const results = await getUsersIngredients();
      setPantryIngredients(results.ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveIngredient = (index) => {
    const newIngredients = [...pantryIngredients];
    newIngredients.splice(index, 1);
    setPantryIngredients(newIngredients);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => onRemoveIngredient(index)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.pictureURL }} />
          <Text style={styles.title}>{item.ingredientName}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      </TouchableOpacity>
      <Button title="Remove" color="#841584" onPress={() => onRemoveIngredient(index)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pantryIngredients}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your pantry is empty</Text>
          </View>
        )}
      />
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