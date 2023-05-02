import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


//renders a screen with an input field to add items to a shopping list, a list of items with checkboxes, and a button to remove items. 
//It uses the React hooks "useState" and "useEffect" to manage the state of the input text and the shopping list 
//and store them in AsyncStorage, a local storage system. 
//The "useEffect" hooks are used to load the saved items from AsyncStorage when the component mounts 
//and save the items to AsyncStorage when the shoppingList state changes. 
//The "handleAddItem", "handleRemoveItem", and "handleToggleCheck" functions handle adding, removing, and toggling the checked state of items in the shopping list. 
//The "FlatList" component is used to render the list of items efficiently.
const ShoppingListScreen = () => {
  const [inputText, setInputText] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  // Load saved items from AsyncStorage on component mount
  useEffect(() => {
    async function loadItems() {
      const savedItems = await AsyncStorage.getItem("shoppingList");
      if (savedItems) {
        setShoppingList(JSON.parse(savedItems));
      }
    }
    loadItems();
  }, []);

  // Save items to AsyncStorage when the shoppingList state changes
  useEffect(() => {
    async function saveItems() {
      await AsyncStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }
    saveItems();
  }, [shoppingList]);



  // adds a new item to a shopping list stored in the shoppingList state variable. 
  //It checks if the inputText variable is not empty and if so, adds a new object to the list with a unique id, 
  //the text from the inputText variable, and a checked value of false. Finally, it clears the inputText variable.
  const handleAddItem = () => {
    if (inputText.trim() !== "") {
      setShoppingList([
        ...shoppingList,
        { id: Date.now(), text: inputText, checked: false },
      ]);
      setInputText("");
    }
  };


  //takes an itemId as its argument. Inside the function, it creates a new array called updatedList by filtering the original 
  //shoppingList array to remove the item with the matching itemId. 
  //Finally, the setShoppingList function is called with the updated array to update the state. 
  const handleRemoveItem = (itemId) => {
    const updatedList = shoppingList.filter((item) => item.id !== itemId);
    setShoppingList(updatedList);
  };


  //takes an itemId parameter. 
  //It uses the map method to create a new array (updatedList) by iterating over each element in the shoppingList array. 
  //If the id of the current element matches the itemId parameter, it creates a new object with the same properties as the 
  //current element but with the checked property toggled to its opposite value. Otherwise, it returns the current element as is. 
  //Finally, it updates the shoppingList state with the new updatedList.
  const handleToggleCheck = (itemId) => {
    const updatedList = shoppingList.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setShoppingList(updatedList);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Add an item"
          style={{
            flex: 1,
            marginRight: 16,
            padding: 8,
            backgroundColor: "#fff",
            borderRadius: 8,
          }}
        />
        <TouchableOpacity
          onPress={handleAddItem}
          style={{ backgroundColor: "#A8DDA8", padding: 8, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff" }}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={shoppingList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
            onPress={() => handleToggleCheck(item.id)}
          >
            <Text
              style={{
                flex: 1,
                textDecorationLine: item.checked ? "line-through" : "none",
              }}
            >
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
              <Text style={{ color: "#FF3B30" }}>Remove</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ShoppingListScreen;
