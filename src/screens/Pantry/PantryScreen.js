import React, { useState, useEffect, useLayoutEffect } from "react";
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

// const {
//   //getUsersIngredients,
//   //removeIngredientFromPantry,
//   //updateIngredientAmount,
// } = require("../../utils/APICalls.js");

const { getUsersIngredients, removeIngredientFromPantry, updateIngredientAmount } = require("../../utils/APICalls/SimplKitchen/pantry");

const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      drawerLockMode: "locked-closed",
      headerLeft: () => (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Image
            source={require("../../../assets/icons/menu.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
      if (pantryIngredients[index].amount > 1) {
        pantryIngredients[index].amount -= 1;
        await updateIngredientAmount(pantryIngredients[index]);
      } else {
        await removeIngredientFromPantry(pantryIngredients[index]);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onAddIngredient = async (index) => {
    try {
      pantryIngredients[index].amount += 1;
      await updateIngredientAmount(pantryIngredients[index]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image style={styles.photo} source={{ uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.pictureURL}` }} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.title}>{item.ingredientName}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => {
                onRemoveIngredient(index);
              }}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.amount}</Text>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => {
                onAddIngredient(index);
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