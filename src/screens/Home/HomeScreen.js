import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  RefreshControl,
  Button,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native"; // import the useNavigation hook
import DrawerContainer from "../DrawerContainer/DrawerContainer"; // import the DrawerContainer component
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation(); // use the useNavigation hook
  

  const fetchData = () => {
    // setRefreshing(true);
    fetch(
      "https://api.spoonacular.com/recipes/random?number=10&apiKey=e44c9f0796b4400ab3a69f1354d139a9"
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes);
        // setRefreshing(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
    // Add drawer lock mode and header button to screen options
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
    });
  }, []);

  const handleAddToMealPlan = (recipe) => {
    navigation.navigate("MealPlan", { recipe }); // navigate to the MealPlan screen and pass the recipe as a parameter
  };

  const renderRecipe = ({ item }) => {
    return (
      <View style={styles.recipe}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>Servings: {item.servings}</Text>
          <Text style={styles.info}>
            Ready in: {item.readyInMinutes} minutes
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Add to Meal Plan"
              onPress={() => handleAddToMealPlan(item)}
            />
          </View>
          <Text style={styles.info}>Calories: {item.calories}</Text>
          <Text style={styles.info}>Fat: {item.fat}</Text>
          <Text style={styles.info}>Carbs: {item.carbs}</Text>
          <Text style={styles.info}>Protein: {item.protein}</Text>
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
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
