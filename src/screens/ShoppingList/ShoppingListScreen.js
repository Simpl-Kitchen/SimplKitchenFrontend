import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./styles";

const ShoppingListScreen = ({ pantryItems }) => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    // Get all unique items in the pantry
    const uniqueItems = [...new Set(pantryItems.map((item) => item.name))];

    // Create an array of objects with name and quantity properties
    const shoppingListItems = uniqueItems.map((itemName) => {
      return {
        name: itemName,
        quantity: pantryItems.filter((item) => item.name === itemName).length,
      };
    });

    // Sort the shopping list alphabetically by item name
    shoppingListItems.sort((a, b) => a.name.localeCompare(b.name));

    setShoppingList(shoppingListItems);
  }, [pantryItems]);

  const renderShoppingListItem = ({ item }) => (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.quantity} in pantry</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={shoppingList}
        renderItem={renderShoppingListItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default ShoppingListScreen;
