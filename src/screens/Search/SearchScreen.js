import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { getIngredientsByName, addIngredientToPantry } from "../../utils/APICalls";
import IngredientsList from "./IngredientsList";
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
      console.log("Inside handleAddIngredient :: ingredient = ", ingredient);
      addIngredientToPantry(ingredient);
    } catch (error) {
      console.log(error);
    }
    console.log(ingredient);
  };

  const onPressIngredient = (ingredient) => {
    navigation.navigate("Ingredient", { ingredient });
  };

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} fetchData={fetchData} />
      <View style={styles.carouselContainer}>
        <IngredientsList
          ingredients={ingredients}
          onPressIngredient={onPressIngredient}
          handleAddIngredient={handleAddIngredient}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

