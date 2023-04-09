// SearchScreen.js
import React, { useState } from "react";
import { View, FlatList, KeyboardAvoidingView } from "react-native";
import styles from "./styles";
import { getIngredientsByName, addIngredientToPantry } from "../../utils/APICalls";
import IngredientItem from "./IngredientItem";
import SearchBar from "./SearchBar";

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const fetchData = async () => {
    try {
      const queryObject = { search };
      const results = await getIngredientsByName(queryObject);

      results.forEach((item) => {
        item.image = `https://spoonacular.com/cdn/ingredients_500x500/${item.image}`;
      });

      setIngredients(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddIngredient = (ingredient) => {
    try {
      addIngredientToPantry(ingredient);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressIngredient = (ingredient) => {
    navigation.navigate("Ingredient", { ingredient });
  };

  const renderIngredient = ({ item, index }) => {
    if (index % 2 !== 0) return null;

    const secondItem =
      index + 1 < ingredients.length ? ingredients[index + 1] : null;

    return (
      <KeyboardAvoidingView style={styles.rowContainer}>
        {[item, secondItem].map(
          (ingredient, idx) =>
            ingredient && (
              <IngredientItem
                key={ingredient.id}
                ingredient={ingredient}
                onPress={onPressIngredient}
                onAdd={handleAddIngredient}
              />
            )
        )}
      </KeyboardAvoidingView>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} onSearch={fetchData} />
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
