import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  RefreshControl,
  Button,
} from "react-native";
// import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
// import DrawerContainer from "../DrawerContainer/DrawerContainer";
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
    });
  }, []);

  const handleAddToMealPlan = (recipe) => {
    navigation.navigate("MealPlan", { recipe });
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
