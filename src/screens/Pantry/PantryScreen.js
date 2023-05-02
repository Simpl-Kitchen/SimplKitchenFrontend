import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import MenuButton from "../../components/MenuButton/MenuButton";
import IconButton from "../../components/IconButton/IconButton";

import styles from "./styles";

const {
  getUsersIngredients,
  removeIngredientFromPantry,
  updateIngredientAmount,
} = require("../../utils/APICalls/SimplKitchen/pantry");



//PantryScreen that fetches a list of ingredients from an API and displays them in a list. 
//The component has two useEffect hooks, one of which sets options for the navigation drawer and header 
//and the other of which fetches the data from the API. 
//The component also has two functions, onRemoveIngredient and onAddIngredient, which handle updating the amount of an ingredient. 
//Finally, the component returns a FlatList that renders the list of ingredients 
//and a button that navigates to a screen for searching and adding new ingredients.
const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    navigation.setOptions({
      drawerLockMode: "locked-closed",
      headerLeft: () => (
        <MenuButton
          title="Menu"
          source={require("../../../assets/icons/menu.png")}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
  }, []);



  // function fetchData that uses async/await to call a function called getUsersIngredients and 
  //sets the result to a state variable called PantryIngredients. 
  //If an error occurs, it logs the error to the console.
  const fetchData = async () => {
    try {
      const results = await getUsersIngredients();
      setPantryIngredients(results.ingredients);
    } catch (error) {
      console.log(error);
    }
  };



  //an async function named onRemoveIngredient that takes an index parameter. 
  //It first checks if the amount property of the pantryIngredients array at the specified index is greater than 1. 
  //If it is, it decrements the amount property by 1 and calls an updateIngredientAmount function with the updated ingredient object. 
  //If it is not greater than 1, it calls a removeIngredientFromPantry function with the ingredient object at the specified index. 
  //Finally, it calls a fetchData function and catches any errors that occur, logging them to the console.
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



  //an asynchronous function called onAddIngredient that takes an index parameter. 
  //Inside the function, the amount property of an element in the pantryIngredients array at the specified index is incremented by 1. 
  //Then, the updated ingredient is passed to an updateIngredientAmount function and the fetchData function is called. 
  //If any errors occur, they are logged to the console.
  const onAddIngredient = async (index) => {
    try {
      pantryIngredients[index].amount += 1;
      await updateIngredientAmount(pantryIngredients[index]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };



  //function called renderItem that takes an object with two properties: item and index as an argument. 
  //The function returns a JSX element that contains an image, text, and two buttons, styled with CSS. 
  //The image is loaded from an API using the uri property of the source object. 
  //The buttons have onPress functions that call onRemoveIngredient and onAddIngredient, passing the index property as an argument.
  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.photo}
        source={{
          uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.pictureURL}`,
        }}
      />
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.ingredientName}</Text>
        <View style={styles.quantityContainer}>
          <IconButton
            iconName="minus"
            onPress={() => onRemoveIngredient(index)}
          />
          <Text style={styles.quantity}>{item.amount}</Text>
          <IconButton iconName="plus" onPress={() => onAddIngredient(index)} />
        </View>
      </View>
      <IconButton
        iconName="trash"
        onPress={() => onRemoveIngredient(index)}
        style={styles.removeButton}
      />
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
        onPress={() =>
          navigation.navigate("IngredientSearch", { screen: "IngredientSearch" })
        }
      >
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantryScreen; 