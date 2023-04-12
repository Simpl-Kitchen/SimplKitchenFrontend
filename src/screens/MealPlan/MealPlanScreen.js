import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const MealPlanScreen = () => {
  const [mealPlans, setMealPlans] = useState([]);

  const getMealPlans = () => {
    fetch('https://api.spoonacular.com/mealplanner/generate?apiKey=e44c9f0796b4400ab3a69f1354d139a9')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMealPlans(data.meals);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <Button title="Get Weekly Plan" onPress={getMealPlans} />
      {mealPlans && mealPlans.length > 0 && mealPlans.map(meal => (
        <View key={meal.id}>
          <Text style={styles.title}>{meal.title}</Text>
          <Image source={{ uri: `https://spoonacular.com/recipeImages/${meal.image}` }} style={styles.image} />
          <Text style={styles.subTitle}>Recipes:</Text>
          {meal.ingredients.map((ingredient, index) => (
            <View key={index}>
              <Text>{ingredient.name}</Text>
              <Text>{ingredient.amount.metric.value} {ingredient.amount.metric.unit}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
});

export default MealPlanScreen;
