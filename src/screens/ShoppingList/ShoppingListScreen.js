import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const ShoppingListScreen = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const navigation = useNavigation();

  const apiKey = "your_api_key_here";
  const username = "your_username_here";
  const startDate = "2023-04-17";
  const endDate = "2023-04-23";
  const apiURL = `https://api.spoonacular.com/mealplanner/${username}/shopping-list/${startDate}/${endDate}?apiKey=${apiKey}`;

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const fetchShoppingList = async () => {
    try {
      const response = await axios.get(apiURL);
      setShoppingList(response.data.ingredients);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.shoppingListItem}
      onPress={() => {
        navigation.navigate("IngredientScreen", { ingredient: item });
      }}
    >
      <Text style={styles.ingredientName}>{item.name}</Text>
      <Text style={styles.ingredientAmount}>
        {item.amount.metric.value} {item.amount.metric.unit}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <FlatList
          data={shoppingList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

export default ShoppingListScreen;
