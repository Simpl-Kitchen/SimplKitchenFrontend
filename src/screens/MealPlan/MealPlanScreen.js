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
import MenuButton from "../../components/MenuButton/MenuButton";
import { generateMealPlanWeek } from "../../utils/APICalls/Spoonacular/user";


//renders a screen called MealPlanScreen. 
//The component uses the useState hook to manage the state of mealPlan and selectedDay, 
//and the useEffect hook to fetch data when the component mounts and set some navigation options. 
//The code also defines functions to save and load meal plans using AsyncStorage, and another function called getMealPlans 
//that fetches a meal plan and saves it. Finally, the component defines a function called renderMealPicker 
//that returns a Picker component and a FlatList component that render meal plan data based on the selected day.
const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState("monday");
  const navigation = useNavigation();

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

  const fetchData = async () => {
    try {
      const fetchedMealPlan = await generateMealPlanWeek();
      setMealPlan(fetchedMealPlan);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };


  //function called saveMealPlans, which takes in a parameter called meals. 
  //This function uses the AsyncStorage API to store the meals parameter as a JSON string in local storage. 
  //The async keyword in the function signature means that the function returns a promise and can be awaited.
  const saveMealPlans = async (meals) => {
    await AsyncStorage.setItem("mealPlans", JSON.stringify(meals));
  };


  //uses AsyncStorage to get stored meal plans. 
  //If there are any stored meal plans, they are parsed into JSON and set with setMealPlan.
  const loadMealPlans = async () => {
    const storedMealPlans = await AsyncStorage.getItem("mealPlans");
    if (storedMealPlans !== null) {
      setMealPlan(JSON.parse(storedMealPlans));
    }
  };


  // function called getMealPlans. It tries to generate a meal plan for a week using the generateMealPlanWeek() function 
  //and sets the fetched meal plan using setMealPlan(). It also saves the meal plan using saveMealPlans(). 
  //If an error occurs in fetching the meal plan, it logs the error message to the console using console.error().
  const getMealPlans = async () => {
    try {
      const fetchedMealPlan = await generateMealPlanWeek();
      setMealPlan(fetchedMealPlan);
      saveMealPlans(fetchedMealPlan);
    } catch (error) {
      console.error("Error getting meal plan:", error);
    }
  };

  const renderMealPicker = () => {
    if (mealPlan === null) {
      return null;
    }
    return (
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
      </View>
    </ScrollView>
  );
};

export default MealPlanScreen;
