import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DrawerContainer from '../DrawerContainer/DrawerContainer.js';

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
    <View style={styles.container}>
      <DrawerContainer navigation={navigation} />
      <View style={styles.content}>
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  recipe: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
  },
});

export default HomeScreen;
