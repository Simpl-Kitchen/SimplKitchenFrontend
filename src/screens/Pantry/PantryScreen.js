
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import MenuButton from "../../components/MenuButton/MenuButton";
import IconButton from "../../components/IconButton/IconButton";

import styles from "./styles";

const {
  getUsersIngredients,
  removeIngredientFromPantry,
  updateIngredientAmount,
} = require("../../utils/APICalls/SimplKitchen/pantry");


  //function called wait that takes a timeout parameter. 
  //The function returns a Promise that resolves after the specified timeout period in milliseconds. 
  //Essentially, this function can be used to delay the execution of a piece of code.
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



  //defines a screen component called PantryScreen for a mobile app that allows users to manage items in their pantry. 
  //The component uses React hooks to manage state and make asynchronous calls to a backend API to retrieve, update
  //and delete pantry items. The component also defines a FlatList to display the pantry items and provides user 
  //interface elements such as buttons and icons to add, remove, and update pantry items. 
  //Finally, the component returns a view with the FlatList and a button to navigate to a screen to search for 
  //new ingredients to add to the pantr
const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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
      const results = await getUsersIngredients();
      setPantryIngredients(results.ingredients);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };



  //function named handleAddIngredient that takes an ingredient parameter. 
  //When called, it adds the ingredient to an array of pantryIngredients using the setPantryIngredients function. 
  //The setPantryIngredients function updates the state of the component while spreading the existing pantryIngredients 
  //array and adding the new ingredient at the end.
  const handleAddIngredient = (ingredient) => {
    setPantryIngredients([...pantryIngredients, ingredient]);
    
  };
  



  //asynchronous function called onRemoveIngredient that takes an index parameter. 
  //Within the function, it checks if the amount property of an ingredient object at the specified index 
  //in an array called pantryIngredients is greater than 1. If it is, it subtracts 1 from the amount property 
  //and updates the ingredient amount using an asynchronous function called updateIngredientAmount. 
  //If the amount property is 1 or less, it removes the ingredient from the pantry using another asynchronous 
  //function called removeIngredientFromPantry. Finally, the function calls fetchData, which is presumably another 
  //asynchronous function that fetches some data. If any errors occur within the try block, they are caught and logged to the console.
  const onRemoveIngredient = async (index) => {
    try {
      if (pantryIngredients[index].amount > 1) {
        pantryIngredients[index].amount -= 1;
        await updateIngredientAmount(pantryIngredients[index]);
      } else {
        await removeIngredientFromPantry(pantryIngredients[index]);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };


  //If any errors occur, they are logged to the console.
  const onAddIngredient = async (index) => {
    try {
      pantryIngredients[index].amount += 1;
      await updateIngredientAmount(pantryIngredients[index]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.photo}
        source={{
          uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.pictureURL}`,
        }}
      />
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.ingredientName}</Text>
        <View style={styles.quantityContainer}>
          <IconButton
            iconName="minus"
            onPress={() => onRemoveIngredient(index)}
          />
          <Text style={styles.quantity}>{item.amount}</Text>
          <IconButton iconName="plus" onPress={() => onAddIngredient(index)} />
        </View>
      </View>
      <IconButton
        iconName="trash"
        onPress={() => onRemoveIngredient(index)}
        style={styles.removeButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pantryIngredients}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your pantry is empty</Text>
          </View>
        )}
        refreshing={false}
        onRefresh={fetchData}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("IngredientSearch", { screen: "IngredientSearch" })
        }
      >
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>
    </View>
  );
      }
      
export default PantryScreen;  