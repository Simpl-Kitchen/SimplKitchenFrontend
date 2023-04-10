import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  RefreshControl,
} from "react-native";

import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setRefreshing(true);
    fetch(
      "https://api.spoonacular.com/recipes/random?number=10&apiKey=e44c9f0796b4400ab3a69f1354d139a9"
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes);
        setRefreshing(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderRecipe = ({ item }) => {
    return (
      <View style={styles.recipe}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>Servings: {item.servings}</Text>
          <Text style={styles.info}>Ready in: {item.readyInMinutes} minutes</Text>
          <Text style={styles.summary}>{item.summary.replace(/(<([^>]+)>)/gi, "")}</Text>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          <Text style={styles.ingredients}>{item.extendedIngredients.map(ingredient => `${ingredient.originalString}\n`).join("")}</Text>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructions}>{item.instructions.replace(/(<([^>]+)>)/gi, "").trim()}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;


