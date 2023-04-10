import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, Image } from "react-native";
import styles from "./styles";

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/recipes/random?number=10&apiKey=e44c9f0796b4400ab3a69f1354d139a9"
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error(error));
  }, []);

  const renderRecipe = ({ item }) => {
    return (
      <View style={styles.recipe}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>
          {item.summary.replace(/(<([^>]+)>)/gi, "")}
        </Text>
        <Text style={styles.info}>
          Ready in {item.readyInMinutes} minutes | Serves {item.servings} |
          Difficulty {item.difficulty}
        </Text>
        <Text style={styles.ingredientsTitle}>Ingredients:</Text>
        <Text style={styles.ingredients}>
          {item.extendedIngredients.map((i) => "- " + i.original).join("\n")}
        </Text>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructions}>
          {item.instructions
            .replace(/(<([^>]+)>)/gi, "")
            .replace(/\r?\n|\r/g, "\n\n")}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
