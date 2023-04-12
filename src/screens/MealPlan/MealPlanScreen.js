import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuButton from "../../components/MenuButton/MenuButton";

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

  const fetchData = async () => {
    const response = await fetch("https://api.spoonacular.com/recipes");
    const data = await response.json();
    setRecipes(data);
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

export default MealPlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    color: "red",
  },
  emptyMessage: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  recipe: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
