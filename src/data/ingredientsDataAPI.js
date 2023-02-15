import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import axios from "axios";

const getIngredients = async () => {
  const response = await axios.get(
    "https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search=lettuce%27"
  );
  return response.data.drinks;
};

const IngredientsDataAPI = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((ingredients) => setIngredients(ingredients));
  }, []);

  return (
    <View>
      <Text>Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.idIngredient}
        renderItem={({ item }) => {
          return <Text>{item.strIngredient}</Text>;
        }}
      />
    </View>
  );
};
