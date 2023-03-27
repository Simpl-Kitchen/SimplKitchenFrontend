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


import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import axios from "axios";
import Carousel from "react-native-snap-carousel";

const PantryScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://simplkitchenapi.onrender.com/api/v1/search/ingredients")
      .then((response) => {
        console.log(JSON.stringify(response.data.foodData));
        setIngredients(response.data.ingredients);
      });
  }, []);

  const handleSearch = () => {
    Keyboard.dismiss(); // dismiss keyboard when button is pressed
    const results = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    carouselRef.current.snapToItem(0); // reset carousel to first slide
  };

  const handleIngredientClick = async (ingredientName) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://simplkitchenapi.onrender.com/api/v1/search/ingredients',
        params: {ingredients: ingredientName},
        headers: {'Content-Type': 'application/json'}
      };
      const response = await axios.request(options);
      console.log("API call success: ", response.data);
      // throw alert with ingredient text
      console.log(response.data.foodData);
      this.setState({ recipes: response.data.foodData });
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.slide}
      onPress={() => handleIngredientClick(item.name)}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an ingredient"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={searchResults.length > 0 ? searchResults : ingredients}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={280}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "top",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#0099ff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  carouselContainer: {
    height: 300,
  },
  slide: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default PantryScreen;
