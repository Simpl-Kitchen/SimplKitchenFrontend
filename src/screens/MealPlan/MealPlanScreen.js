import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

const MealPlanScreen = () => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    loadMealPlans();
  }, []);

  const saveMealPlans = async (meals) => {
    try {
      await AsyncStorage.setItem("mealPlans", JSON.stringify(meals));
    } catch (error) {
      console.error("Error saving meal plans: ", error);
    }
  };

  const loadMealPlans = async () => {
    try {
      const storedMealPlans = await AsyncStorage.getItem("mealPlans");
      if (storedMealPlans !== null) {
        setMealPlans(JSON.parse(storedMealPlans));
      }
    } catch (error) {
      console.error("Error loading meal plans: ", error);
    }
  };

  const getMealPlans = () => {
    fetch(
      "https://api.spoonacular.com/mealplanner/generate?apiKey=e44c9f0796b4400ab3a69f1354d139a9&timeFrame=week"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        const mealsArray = Object.values(data.week).flatMap((day) => day.meals);
        const sevenMealsArray = mealsArray.slice(0, 7);
        setMealPlans(sevenMealsArray);
        saveMealPlans(sevenMealsArray);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const renderRecipes = () => {
    return (
      <FlatList
        data={mealPlans}
        keyExtractor={(index, item) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealPlan}>
            <Text style={styles.mealTitle}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>Servings: {item.servings}</Text>
            <Text>Prep Time: {item.readyInMinutes} minutes</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Get Weekly Plan"
        onPress={getMealPlans}
        style={styles.button}
      />
      {renderRecipes()}
    </View>
  );
};

export default MealPlanScreen;
