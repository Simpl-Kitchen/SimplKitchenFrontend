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

import { generateMealPlanWeek } from "../../utils/APICalls/Spoonacular/user";

const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState("monday");
  const navigation = useNavigation();

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
        setMealPlan(JSON.parse(storedMealPlans));
      }
    } catch (error) {
      console.error("Error loading meal plans: ", error);
    }
  };

  const getMealPlans = async () => {
    try {
      const fetchedMealPlan = await generateMealPlanWeek();
      setMealPlan(fetchedMealPlan);
      saveMealPlans(fetchedMealPlan);
    } catch (error) {
      console.error("Error Message:", error.message);
      console.error("Error Code:", error.response.status);
      console.error("Error Response Data:", error.response.data);
      console.error("Error Request URL:", error.config.url);
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
