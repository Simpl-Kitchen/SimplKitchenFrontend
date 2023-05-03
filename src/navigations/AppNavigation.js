import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";
import RecipeScreen from "../screens/Recipe/RecipeScreen";
import DrawerContainer from "../screens/DrawerContainer/DrawerContainer";
import IngredientScreen from "../screens/Ingredient/IngredientScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import IngredientSearchScreen from "../screens/IngredientSearch/IngredientSearchScreen"
import RecipeGeneratorScreen from "../screens/RecipeGenerator/RecipeGeneratorScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import PantryScreen from "../screens/Pantry/PantryScreen";
import MealPlanScreen from "../screens/MealPlan/MealPlanScreen";
import ShoppingListScreen from "../screens/ShoppingList/ShoppingListScreen";
import SavedRecipesScreen from "../screens/SavedRecipes/SavedRecipesScreen";

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center",
          alignSelf: "center",
          flex: 1,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Pantry" component={PantryScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="MealPlan" component={MealPlanScreen} />
      <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
      <Stack.Screen name="Ingredient" component={IngredientScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="IngredientSearch" component={IngredientSearchScreen} />
      <Stack.Screen name="RecipeGenerator" component={RecipeGeneratorScreen} />
      <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
      <Stack.Screen name="SavedRecipes" component={SavedRecipesScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerStyle={{
        width: 250,
        backgroundColor: "#A8DDA8",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => (
        <DrawerContainer navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
