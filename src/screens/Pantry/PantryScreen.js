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
  addIngredientToPantry,
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

  const onAddIngredient = async (index) => {
    try {
      // Add ingredient to pantry
      // await addIngredientToPantry(pantryIngredients[index]);
      // Fetch updated pantry ingredients
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
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => {
                // Decrease quantity of ingredient by 1 if current quantity is greater than 0
                const updatedIngredients = [...pantryIngredients];
                if (updatedIngredients[index].amount > 0) {
                  updatedIngredients[index].amount -= 1;
                  setPantryIngredients(updatedIngredients);
                }
              }}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.amount}</Text>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => {
                // Increase quantity of ingredient by 1
                const updatedIngredients = [...pantryIngredients];
                updatedIngredients[index].amount += 1;
                setPantryIngredients(updatedIngredients);
                // Add ingredient to pantry
                onAddIngredient([index]);
              }}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
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
