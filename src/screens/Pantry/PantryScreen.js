// needs to get ingredients from the database
// needs to display ingredients in a list
// needs to have a button to add ingredients 
// needs to have a button to remove ingredients
// needs to have categories for ingredients (produce, dairy, meat, etc.)
// needs to haev a preset category for ingredients 
// search function for ingredients at the top of screen and barcode scanner 
// needs to have a button to add ingredients to the shopping list
// needs to have a button to add ingredients to the pantry

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const PantryScreen = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    // Fetch ingredients from the database
    axios.get(`https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search=${search}`)
      .then(response => {
        setIngredients(response.data.results);
      })
      .catch(error => {
        console.log(error);
        setIngredients([]);
      });
  }, []);

  const renderIngredient = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={ingredients}
        renderItem={renderIngredient}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default PantryScreen;
