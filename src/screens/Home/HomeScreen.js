import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const navigation = useNavigation();

  const fetchData = () => {
    setRefreshing(true);
    fetch(
      "https://api.spoonacular.com/recipes/random?number=10&apiKey=e44c9f0796b4400ab3a69f1354d139a9"
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
    navigation.setOptions({
      drawerLockMode: "locked-closed",
      headerLeft: () => (
        <MenuButton
          title="Menu"
          source={require("../../../assets/icons/menu.png")}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setSortBy((prevSortBy) => (prevSortBy === "asc" ? "desc" : "asc"));
          }}
        >
          <Text style={styles.filterButtonText}>price ⇅</Text>
        </TouchableOpacity>
      ),
    });
  }, []); // Remove sortBy dependency

  const handleAddToMealPlan = (recipe) => {
    navigation.navigate("MealPlan", { recipe: recipe });
  };

  const renderRecipe = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.recipe}
        onPress={() => navigation.navigate("Recipe", { recipe: item })}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>Likes: {item.aggregateLikes} </Text>
          <Text style={styles.info}>Servings: {item.servings}</Text>
          <Text style={styles.info}>
            Ready in: {item.readyInMinutes} minutes
          </Text>
          <Text style={styles.info}>
            Price per serving: ${(item.pricePerServing / 100).toFixed(2)}
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => handleAddToMealPlan(item)}
          >
            <Text style={styles.buttonText}>Add to Meal Plan</Text>
          </TouchableOpacity>
          <Text style={styles.info}>
            Gluten Free: {item.glutenFree ? "Yes" : "No"}
          </Text>
          <Text style={styles.info}>Vegan: {item.vegan ? "Yes" : "No"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const sortedRecipes = recipes.sort((a, b) => {
    if (sortBy === "asc") {
      return a.pricePerServing - b.pricePerServing;
    } else if (sortBy === "desc") {
      return b.pricePerServing - a.pricePerServing;
    } else {
      return 0;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
