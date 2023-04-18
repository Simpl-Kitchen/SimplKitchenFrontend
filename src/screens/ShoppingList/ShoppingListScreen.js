import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const handleAddItem = () => {
    if (inputText.trim() !== "") {
      setShoppingList([
        ...shoppingList,
        { id: Date.now(), text: inputText, checked: false },
      ]);
      setInputText("");
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedList = shoppingList.filter((item) => item.id !== itemId);
    setShoppingList(updatedList);
  };

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
