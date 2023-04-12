import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuButton from "../../components/MenuButton/MenuButton";
import { getToken } from "../../utils/APICalls/SimplKitchen/user";


const MealPlanScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();

  const handleClearMealPlan = () => {
    setRecipes([]);
  };

  const renderRecipe = ({ item }) => {
    return (
      <View style={styles.recipe}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  }

  const fetchData = async () => {
    const token = await getToken();
    const response = await fetch(
      "https://api.spoonacular.com/recipes/random?number=10&apiKey=e44c9f0796b4400ab3a69f1354d139a9",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      }
    );
    const data = await response.json();
    setRecipes(data.recipes);
  };
  
  useEffect(() => {
    console.log("Fetching recipes...");
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Plan</Text>
        <Text style={styles.clearButton} onPress={handleClearMealPlan}>
          Clear
        </Text>
      </View>
      {recipes.length === 0 ? (
        <Text style={styles.emptyMessage}>No meals added to meal plan.</Text>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipe}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  clearButton: {
    fontSize: 16,
    color: "red",
  },
  emptyMessage: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  recipe: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MealPlanScreen;
