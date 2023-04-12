import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

import styles from './styles';

const MealPlanScreen = () => {
  const [mealPlans, setMealPlans] = useState([]);

  const getMealPlans = () => {
    fetch('https://api.spoonacular.com/mealplanner/generate?apiKey=e44c9f0796b4400ab3a69f1354d139a9')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMealPlans(data.week);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderRecipes = () => {
    return mealPlans.map((mealPlan, index) => {
      return (
        <View style={styles.mealPlan} key={index}>
          <Text style={styles.mealTitle}>{mealPlan.title}</Text>
          <Image source={{ uri: mealPlan.image }} style={styles.image} />
          <Text>Servings: {mealPlan.servings}</Text>
          <Text>Prep Time: {mealPlan.readyInMinutes} minutes</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Get Weekly Plan" onPress={getMealPlans} style={styles.button} />
      {mealPlans && mealPlans.length > 0 && renderRecipes()}
    </View>
  );
};


export default MealPlanScreen;
