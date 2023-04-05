import React, { useState } from "react";
import axios from "axios";
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
import handleAddIngredient from "../Search/SearchScreen";

const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);

  const onAddIngredient = () => {
    const ingredient = route.params?.ingredient;
    if (ingredient) {
      setPantryIngredients([...pantryIngredients, ingredient]);
      handleAddIngredient(ingredient);
    }
  };

  const onRemoveIngredient = (index) => {
    const newPantryIngredients = [...pantryIngredients];
    newPantryIngredients.splice(index, 1);
    setPantryIngredients(newPantryIngredients);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => console.log(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.image }} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableHighlight>
      <Button
        title="Remove"
        color="#841584"
        onPress={() => onRemoveIngredient(index)}
      />
    </View>
  );

  const setPantry = (ingredients) => {
    setPantryIngredients([...pantryIngredients, ...ingredients]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pantryIngredients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your pantry is empty</Text>   
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Ingredient"
          color="#A8DDA8"
          onPress={() => navigation.navigate("Search", { screen: "Search" })}
        />
      </View>
      <View>
        <Image style={styles.photo} source={{ uri: pantryIngredients.item }} />
        <Text style={styles.title}>{pantryIngredients.item }</Text>
      </View>
    </View>
  );
};

export default PantryScreen;
