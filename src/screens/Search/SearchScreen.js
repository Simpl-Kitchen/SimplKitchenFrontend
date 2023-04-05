// needs to get ingredients from the database
// needs to display ingredients in a list
// needs to have a button to add ingredients
// needs to have a button to remove ingredients
// needs to have categories for ingredients (produce, dairy, meat, etc.)
// needs to haev a preset category for ingredients
// search function for ingredients at the top of screen and barcode scanner
// needs to have a button to add ingredients to the shopping list
// needs to have a button to add ingredients to the pantry
// needs to have authorization
// Dan needs you to add some "Token" thing

import React, { useState } from "react";
//import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import styles from "./styles";

import { getIngredientsByName } from "../../utils/APICalls";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const fetchData = async () => {
    try {
      const queryObject = { search };
      
      const results = await getIngredientsByName(queryObject);

      // if (dropdown includes grocery items) {
      //   results = results + await getGroceryProductsByName
      // }


      // Loop through the results array and display the properties in a cleaner format
      results.forEach((item, index) => {
        console.log(
          `${index + 1}. ID: ${item.id}, Name: ${item.name}, Image: ${
            item.image
          }`
        );
      });

      // Append image url to image
      results.forEach((item) => {
        item.image = `https://spoonacular.com/cdn/ingredients_500x500/${item.image}`;
      });

      setIngredients(results);
    } catch (error) {
      console.log(error);
    }
  };

  // Define pantry object

  const handleAddIngredient = (ingredient) => {
    navigation.navigate("Pantry", { ingredient });
    console.log(ingredient);
    
  };


  const onPressIngredient = (ingredient) => {
    navigation.navigate("Ingredient", { ingredient });
  };

  const renderIngredient = ({ item, index }) => {
    // Render two items per row
    if (index % 2 === 0) {
      // Check if the current item is the last item
      const secondItem =
        index + 1 < ingredients.length ? ingredients[index + 1] : null;

      return (
        <KeyboardAvoidingView style={styles.rowContainer}>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,0.9)"
            onPress={() => onPressIngredient(item)}
          >
            <View style={styles.container}>
              <Image style={styles.photo} source={{ uri: item.image }} />
              <Text style={styles.title}>{item.name}</Text>
              <Button
                title="⊕ Add To Pantry"
                color="#0D0C0C"
                onPress={() => handleAddIngredient(item)}
              />
            </View>
          </TouchableHighlight>
          {secondItem && (
            <TouchableHighlight
              underlayColor="rgba(73,182,77,0.9)"
              onPress={() => onPressIngredient(secondItem)}
              style={styles.rowItem}
            >
              <View style={styles.container}>
                <Image
                  style={styles.photo}
                  source={{ uri: secondItem.image }}
                />
                <Text style={styles.title}>{secondItem.name}</Text>
                <Button
                  title="⊕ Add To Pantry"
                  color="#0D0C0C"
                  onPress={() => handleAddIngredient(item)}
                />
              </View>
            </TouchableHighlight>
          )}
        </KeyboardAvoidingView>
      );
    }

    // For odd indices, do not render anything
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an ingredient"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <Button title="SEARCH" color="#0D0C0C" onPress={fetchData} />
      </View>
      <View style={styles.carouselContainer}>
        <FlatList
          data={ingredients}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
