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

  const renderMealPlan = (meal) => {
    return (
      <View style={styles.mealPlanContainer} key={meal.id}>
        <Text style={styles.title}>{meal.title}</Text>
        <Image source={{ uri: `https://spoonacular.com/recipeImages/${meal.image}` }} style={styles.image} />
        <Text style={styles.subTitle}>Recipes:</Text>
        {meal.extendedIngredients.map((ingredient, index) => (
          <View style={styles.ingredientsContainer} key={index}>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
            <Text style={styles.ingredientAmount}>{ingredient.amount} {ingredient.unit}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Get Weekly Plan" onPress={getMealPlans} style={styles.button} />
      {mealPlans && mealPlans.length > 0 && mealPlans.map(meal => renderMealPlan(meal))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginBottom: 20,
  },
  mealPlanContainer: {
    marginBottom: 20,
  },
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
    marginBottom: 10,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ingredientName: {
    flex: 1,
    marginRight: 10,
  },
  ingredientAmount: {
    flex: 0,
  },
});

export default MealPlanScreen;
