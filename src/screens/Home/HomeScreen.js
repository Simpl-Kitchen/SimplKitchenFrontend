import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DrawerContainer from '../DrawerContainer/DrawerContainer.js';
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('https://api.spoonacular.com/recipes/random?number=10&apiKey=YOUR_API_KEY')
      .then(response => response.json())
      .then(data => setRecipes(data.recipes))
      .catch(error => console.error(error));
  }, []);

  const renderRecipe = ({ item }) => {
    return (
      <View style={styles.recipe}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContainer navigation={navigation} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};


export default HomeScreen;
