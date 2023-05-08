import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import IngredientItem from "./IngredientItem";
import styles from "./styles";
import { searchIngredientsByName } from "../../utils/APICalls/Spoonacular/ingredients";
import { addIngredientToPantry } from "../../utils/APICalls/SimplKitchen/pantry";

const IngredientSearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const fetchData = async () => {
    try {
      const ingredientSearch = await searchIngredientsByName(search);
      const ingredients = ingredientSearch.results;
      console.log(ingredients[0].possibleUnits);
      setIngredients(ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddIngredient = async (ingredient) => {
    try {
      await addIngredientToPantry(ingredient);
      navigation.navigate("Pantry", {
        callback: fetchData, // Pass the fetchData function as a callback
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPressIngredient = (ingredient) => {
    navigation.navigate("Ingredient", { ingredient });
  };

  const renderIngredient = ({ item }) => (
    <IngredientItem
      key={item.id}
      ingredient={item}
      onPress={onPressIngredient}
      onAdd={handleAddIngredient}
    />
  );


  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          platform="ios"
          placeholder="Search for ingredients..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={fetchData}
          containerStyle={styles.searchBarInputContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
        />
      </View>
      <View style={styles.carouselContainer}>
        <FlatList
          data={ingredients}
          numColumns={2}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

export default IngredientSearchScreen;
