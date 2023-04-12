import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list'

import { updateUserIntolerences, logoutSimplKitchen } from '../../utils/APICalls/SimplKitchen/user'

import styles from "./styles";
//import * as ImagePicker from "expo-image-picker";

// import { removeToken } from "../../utils/Authorization";
// import { addIngredientToPantry } from "../../utils/APICalls";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export default function ProfileScreen(props) {

  const [selected, setSelected] = React.useState([]);


  const data = [
    { key: '1', value: 'Dairy' },//, disabled: true },
    { key: '2', value: 'Egg' },
    { key: '3', value: 'Gluten' },
    { key: '4', value: 'Grain' },//, disabled: true },
    { key: '5', value: 'Peanut' },
    { key: '6', value: 'Seafood' },
    { key: '7', value: 'Sesame' },
    { key: '8', value: 'Shellfish' },
    { key: '9', value: 'Soy' },
    { key: '10', value: 'Sulfite' },
    { key: '11', value: 'Tree Nut' },
    { key: '12', value: 'Wheat' },
  ]

  const handleSave = () => {
    console.log(selected)

    try {
      updateUserIntolerences(selected)
    } catch (error) {
      console.log(error)
    }

    alert("Saved selected items")
  }

  const handleLogout = async () => {
    // Perform logout actions here
    console.log("Logout clicked");

    try {
      await logoutSimplKitchen()
    } catch (error) {

    }
  };


  return (
    <View style={styles.container}>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        onSelect={() => { }}
        label="Categories"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: "#1E90FF",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   logoutButton: {
//     backgroundColor: "#FF0000",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });