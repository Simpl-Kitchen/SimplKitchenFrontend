import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import styles from "./styles";

const {
  getUsersIngredients,
  removeIngredientFromPantry,
} = require("../../utils/APICalls.js");

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

  const onRemoveIngredient = async (index) => {
    try {
      await removeIngredientFromPantry(pantryIngredients[index]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image style={styles.photo} source={{ uri: item.pictureURL }} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.title}>{item.ingredientName}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      </View>
      <View style={styles.removeButtonContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemoveIngredient(index)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
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
        contentContainerStyle={styles.flatlistContentContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Search", { screen: "Search" })}
      >
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantryScreen;
