import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ShoppingListScreen = ({ username, startDate, endDate }) => {
  const [shoppingList, setShoppingList] = useState(null);

  const fetchShoppingList = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/${username}/shopping-list/${startDate}/${endDate}?apiKey=e44c9f0796b4400ab3a69f1354d139a9`,
        {
          method: "POST",
        }
      );
  
      if (!response.ok) {
        console.error("API response status:", response.status);
        const responseText = await response.text();
        console.error("API response text:", responseText);
        return;
      }
  
      const data = await response.json();
      setShoppingList(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  useEffect(() => {
    fetchShoppingList();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {shoppingList ? (
        <>
          <Text style={styles.title}>Shopping List</Text>
          {shoppingList.ingredients &&
            shoppingList.ingredients.map((ingredient, index) => (
              <TouchableOpacity key={index}>
                <Text style={styles.ingredient}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </Text>
              </TouchableOpacity>
            ))}
        </>
      ) : (
        <Text>Loading shopping list...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  ingredient: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ShoppingListScreen;
