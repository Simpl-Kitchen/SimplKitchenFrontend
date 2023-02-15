import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import axios from "axios";

export default function IngredientsDataApi(props) {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://simplkitchen-api.onrender.com/") // change with simplekitchen api request for ingredients
      .then((res) => {
        setIngredients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ingredients}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.ingredientId}
      />
    </View>
  );
}
