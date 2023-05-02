
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import { Picker } from "@react-native-picker/picker";

import { generateMealPlanWeek, getRecipeInformation } from "../../utils/APICalls/Spoonacular/user";



//functional component that renders a meal planning screen. 
//The component uses the useState hook to manage the state of the meal plan, the selected day of the week, and the shopping list. 
//The component also uses the useEffect hook to load the meal plans when the component is mounted. 
//The saveMealPlans function saves the meal plans to local storage, while the loadMealPlans function 
//retrieves the meal plans from local storage and updates the state accordingly. 
//The getMealPlans function generates a new meal plan and saves it. 
//The extractIngredients function extracts the ingredients from the meal plan and updates the shopping list state. 
//The renderMealPicker function renders a picker for selecting a day of the week and a list of meals for the selected day. 
//Finally, the component renders a button for generating a new meal plan, a button for extracting the ingredients 
//and creating a shopping list, and a list of ingredients for the shopping list.
const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState("monday");
  const [shoppingList, setShoppingList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadMealPlans();
  }, []);



  // an asynchronous function called saveMealPlans that takes an argument called meals. 
  //The function uses the AsyncStorage API to store the meals object as a JSON string, under the key "mealPlans". 
  //The await keyword is used to ensure that the operation is completed before the function exits.
  const saveMealPlans = async (meals) => {
    await AsyncStorage.setItem("mealPlans", JSON.stringify(meals));
  };



  // an asynchronous function loadMealPlans that retrieves data from the AsyncStorage API using getItem, 
  //which fetches the value associated with the key "mealPlans". 
  //If data is found, it is parsed from JSON and set as the state of mealPlan using setMealPlan.
  const loadMealPlans = async () => {
    const storedMealPlans = await AsyncStorage.getItem("mealPlans");
    if (storedMealPlans !== null) {
      setMealPlan(JSON.parse(storedMealPlans));
    }
  };



  //Calls another async function generateMealPlanWeek and waits for it to return a value using the await keyword.
  //Sets the returned value from generateMealPlanWeek to a variable called fetchedMealPlan.
  //Calls two other functions: setMealPlan and saveMealPlans with the fetchedMealPlan variable as an argument.
  const getMealPlans = async () => {
    const fetchedMealPlan = await generateMealPlanWeek();
    setMealPlan(fetchedMealPlan);
    saveMealPlans(fetchedMealPlan);
  };




  //asynchronous function called extractIngredients that fetches recipe information 
  //for a given meal plan and extracts the ingredients from those recipes. 
  //It then sets the extracted ingredients as the shopping list using the setShoppingList function (not shown in the code snippet). 
  //If the meal plan is null, the function returns without doing anything. 
  //The function uses await and Promise.all to handle the asynchronous nature of the data fetching from the recipe API.
  const extractIngredients = async () => {
    if (mealPlan === null) {
      return;
    } const ingredients = [];




    // a function called fetchIngredients that retrieves a list of ingredients for a meal plan specified in an object called mealPlan.week. 
    //The function iterates over the meals in the plan, retrieves recipe information for each meal using a function called getRecipeInformation, 
    //and adds the resulting ingredients to an array called ingredients. 
    //Finally, the function sets the ingredients array as the shopping list using a function called setShoppingList. 
    //This function uses async/await syntax to handle Promises in a concise and readable way.
    const fetchIngredients = async () => {
      const promises = [];

      Object.values(mealPlan.week).forEach((day) => {
        day.meals.forEach((meal) => {
          promises.push(getRecipeInformation(meal.id));
        });
      });

      const recipes = await Promise.all(promises);

      recipes.forEach((recipe) => {
        recipe.extendedIngredients.forEach((ingredient) => {
          ingredients.push({
            id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          });
        });
      });

      setShoppingList(ingredients);
    };

    fetchIngredients();
  };




  //a function called renderMealPicker which returns a picker component with options
  //generated from the keys in an object called mealPlan.week. 
  //The selected option value is stored in selectedDay state. Additionally, a FlatList component is rendered 
  //with data from mealPlan.week[selectedDay].meals, 
  //and each item is rendered with a TouchableOpacity component that navigates to a recipe screen when pressed. 
  //The code assumes that mealPlan is an object with a week property that contains keys representing days of the week and 
  //values representing meal plans for each day.
  const renderMealPicker = () => {
    if (mealPlan === null) {
      return null;
    } return (
      <View>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {Object.keys(mealPlan.week).map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
        <FlatList
          data={mealPlan.week[selectedDay].meals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mealPlan}
              onPress={() =>
                navigation.navigate("RecipeScreen", {
                  recipe: item,
                })
              }
            >
              <View>
                <Text style={styles.mealTitle}>{item.title}</Text>
                <Image
                  source={{
                    uri: `https://spoonacular.com/recipeImages/${item.id}-556x370.jpg`,
                  }}
                  style={styles.image}
                />
                <Text>Servings: {item.servings}</Text>
                <Text>Prep Time: {item.readyInMinutes} minutes</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={getMealPlans} style={styles.button}>
          <Text style={styles.buttonText}>Get Weekly Plan</Text>
        </TouchableOpacity>
        {renderMealPicker()}
        <TouchableOpacity onPress={extractIngredients} style={styles.button}>
          <Text style={styles.buttonText}>Create Shopping List</Text>
        </TouchableOpacity>
        <FlatList
          data={shoppingList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.shoppingListItem}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientAmount}>
                {item.amount} {item.unit}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default MealPlanScreen;