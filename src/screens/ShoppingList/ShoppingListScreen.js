import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";



  //It sets up state for the input text and shopping list, 
  //uses useEffect to load and save the shopping list to local storage
  //defines functions to add, remove, and toggle items on the list. 
  //It also sets up the navigation options for the screen and returns a view containing an input for adding items, 
  //a list of items with checkboxes and remove buttons, and a button to add new items.
const ShoppingListScreen = () => {
  const [inputText, setInputText] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadItems() {
      const savedItems = await AsyncStorage.getItem("shoppingList");
      if (savedItems) {
        setShoppingList(JSON.parse(savedItems));
      }
    }
    loadItems();
  }, []);

  useEffect(() => {
    async function saveItems() {
      await AsyncStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }
    saveItems();
  }, [shoppingList]);



  //function called handleAddItem. 
  //The function first checks if the inputText variable is not empty by removing any leading/trailing white 
  //spaces with the trim() function. If it's not empty, the function adds a new item to the shoppingList state 
  //variable using the spread operator (...) to copy the existing array and adding a new object with a unique id, 
  //the inputText, and a checked property set to false. Finally, it clears the inputText variable by setting it to an empty string.
  const handleAddItem = () => {
    if (inputText.trim() !== "") {
      setShoppingList([
        ...shoppingList,
        { id: Date.now(), text: inputText, checked: false },
      ]);
      setInputText("");
    }
  };


  //a function handleRemoveItem that takes in an itemId. 
  //It then uses the filter method to create a new array updatedList that excludes the item with the matching itemId. 
  //Finally, it calls the setShoppingList function with the updated list as an argument.
  const handleRemoveItem = (itemId) => {
    const updatedList = shoppingList.filter((item) => item.id !== itemId);
    setShoppingList(updatedList);
  };



  //function handleToggleCheck that takes an itemId as an argument. 
  //It then creates a new list called updatedList by mapping over the shoppingList array. 
  //For each item in the shoppingList, if the item's id matches the itemId argument, 
  //it returns a new object that is a copy of the original item with the checked property negated. 
  //Otherwise, it returns the original item unchanged. Finally, the state of shoppingList is updated 
  //with the updatedList using the setShoppingList function.
  const handleToggleCheck = (itemId) => {
    const updatedList = shoppingList.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setShoppingList(updatedList);
  };

  useEffect(() => {
    navigation.setOptions({
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
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Add an item"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleAddItem}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={shoppingList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleToggleCheck(item.id)}
          >
            <Text
              style={[
                styles.itemText,
                { textDecorationLine: item.checked ? "line-through" : "none" },
              ]}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

  export default ShoppingListScreen;
