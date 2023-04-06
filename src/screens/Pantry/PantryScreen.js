import React, { useState, useEffect } from "react";
//import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";

import styles from "./styles";

const { getUsersIngredients } = require("../../utils/APICalls.js");

const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);

  const fetchData = async () => {
    console.log("Inside fetchData");
    try {
      const results = await getUsersIngredients();
      console.log("results = ", results.ingredients);
      setPantryIngredients(results.ingredients);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => console.log(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.pictureURL }} />
          <Text style={styles.title}>{item.ingredientName}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      </TouchableHighlight>
      <Button
        title="Remove"
        color="#841584"
        onPress={() => onRemoveIngredient(index)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pantryIngredients}
        renderItem={renderItem}
        //keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your pantry is empty</Text>
          </View>
        )}
      />
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Add Ingredient"
          color="#A8DDA8"
          onPress={() => navigation.navigate("Search", { screen: "Search" })}
        />
      </View> */}
    </View>
  );
};

export default PantryScreen;