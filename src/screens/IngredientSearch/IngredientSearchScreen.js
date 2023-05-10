import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import IngredientItem from "./IngredientItem";
import styles from "./styles";
import { searchIngredientsByName } from "../../utils/APICalls/Spoonacular/ingredients";
import { addIngredientToPantry } from "../../utils/APICalls/SimplKitchen/pantry";



//a functional component called IngredientSearchScreen. 
//The component takes a navigation prop and uses the useState hook to define state variables search and ingredients. 
//The fetchData function is defined using the async/await syntax, which fetches a list of ingredients based on the search 
//query from an external API, logs the first ingredient's possible units to the console, and sets the ingredients state 
//to the fetched list. The handleAddIngredient function is defined to add an ingredient to a pantry and navigate to a 
//screen called "Pantry" with a callback function fetchData passed as a parameter. The onPressIngredient function 
//navigates to a screen called "Ingredient" with an ingredient prop passed as a parameter. 
//Finally, the renderIngredient function takes an object with an item property as its argument
//returns an <IngredientItem> React component with the item property passed as a prop along with onPressIngredient 
//and handleAddIngredient functions. The component returns a view that displays a search bar and a list of ingredients 
//with the FlatList component.
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



  //function called handleAddIngredient that takes in an ingredient parameter. 
  //The function first tries to add the ingredient to a pantry by calling an asynchronous function addIngredientToPantry. 
  //If successful, the function navigates to a screen called "Pantry" and passes a callback function fetchData as a parameter. 
  //If an error occurs, it is logged to the console.
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



  //function called renderIngredient that takes an object with an item property as its argument. 
  //The function returns an <IngredientItem> React component with the item property passed as a prop along with 
  //two functions onPressIngredient and handleAddIngredient. The key prop is set to item.id.
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
