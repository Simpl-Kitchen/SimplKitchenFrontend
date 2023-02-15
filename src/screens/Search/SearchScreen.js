import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, FlatList, TextInput } from "react-native";

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search"
        );

        setIngredients(response.data.ingredients);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View>
      <TextInput
        placeholder="Search for ingredients"
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default IngredientList;
