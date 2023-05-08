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
