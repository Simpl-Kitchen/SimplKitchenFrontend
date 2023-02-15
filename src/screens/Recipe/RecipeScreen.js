// create a page that lists recipes and lets the user select one to view.
// lets the user search for recipes and select one to view.
// pull styles from src/screens/Recipe/styles.js
// use axios to pull from the API and display the recipes in the list.
// show the recipe image and ingredients and recipe name

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";
import {
  getRecipesByCategoryName,
  getRecipesByIngredientName,
} from "../../data/MockDataAPI";
import { TextInput } from "react-native-gesture-handler";
import MenuImage from "../../components/MenuImage/MenuImage";
import styles from "./styles";

export default function SearchScreen(props) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/ingredients") // change with simplekitchen api request for ingredients
      .then((res) => {
        setIngredients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    axios
      .get("http://localhost:3000/recipes") // change with simplekitchen api request for ingredients
      .then((res) => {
        setData(res.data);
        setLoading(false);

        if (value !== "") {
          setCategory(value);
          setData(getRecipesByIngredientName(value, res.data));
        } else {
          setData(getRecipesByCategoryName(value, res.data));
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [value]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.recipeId}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
      <Button
        title="Search"
        onPress={() => {
          if (value !== "") {
            setCategory(value);
            setData(getRecipesByIngredientName(value, data));
          } else {
            setCategory("");
            setData(getRecipesByCategoryName(value, data));
          }
        }}
      >
        Search
      </Button>
      <MenuImage
        category={category}
        ingredients={ingredients}
        onPress={() => {
          if (value !== "") {
            setCategory(value);
            setData(getRecipesByIngredientName(value, data));
          } else {
            setCategory("");
            setData(getRecipesByCategoryName(value, data));
          }
        }}
      />
    </View>
  );
}
