import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableHighlight,
  Image,
} from "react-native";

const IngredientList = ({ categories, navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        `https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search=${searchTerm}`
      );
      console.log(searchTerm);
      setIngredients(response.data.ingredients);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [searchTerm]);

  const getCategoryName = (id) => {
    let name = "";
    // Assuming categories is a prop passed to this component
    categories.forEach((category) => {
      if (category.id === id) {
        name = category.name;
      }
    });
    return name;
  };

  const onPressRecipe = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("Pantry", { ingredient, name });
  };

  const onPressIngredient = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("IngredientsDetail", { ingredient, name });
  };

  const getIngredientName = (id) => {
    let name = "";
    ingredients.forEach((ingredient) => {
      if (ingredient.id === id) {
        name = ingredient.name;
      }
    });
    return name;
  };

  const renderRecipe = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderIngredient = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressIngredient(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <TextInput
        placeholder="Search for ingredients"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <FlatList
        data={ingredients}
        renderItem={renderIngredient}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default IngredientList;
