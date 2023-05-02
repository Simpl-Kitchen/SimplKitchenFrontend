import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { updateUserIntolerences, updateUserDiets, logoutSimplKitchen } from '../../utils/APICalls/SimplKitchen/user'
import { Header } from 'react-navigation';

import styles from "./styles";

export default function ProfileScreen(props) {

  const [selected1, setSelected1] = React.useState([]);
  const [selected2, setSelected2] = React.useState([]);

  const data1 = [
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

  const data2 = [
    { key: '1', value: 'Gluten Free' },
    { key: '2', value: 'Ketogenic' },
    { key: '3', value: 'Lacto-Vegetarian' },
    { key: '4', value: 'Ovo-Vegetarian' },
    { key: '5', value: 'Vegan' },
    { key: '6', value: 'Pescetarian' },
    { key: '7', value: 'Paleo' },
    { key: '8', value: 'Primal' },
    { key: '9', value: 'LowFODMAP' },
    { key: '10', value: 'Whole30' },
  ]

  const handleSave = async () => {
    // console.log("Hello")
    // console.log(selected1)
    // console.log(selected2)

    try {
      await updateUserIntolerences(selected1)
      await updateUserDiets(selected2)
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
      <Header
        style={{backgroundColor: '#FFFFFF'}}
        centerComponent={{ text: 'Intolerances', style: { color: '#000000', fontSize: 18 } }}
      />
      <MultipleSelectList
        setSelected={(val) => setSelected1(val)}
        data={data1}
        save="value"
        onSelect={() => { }}
        label="Intolerances"
      />
      <MultipleSelectList
        setSelected={(val) => setSelected2(val)}
        data={data2}
    save="value"
    onSelect={() => { }}
    label="Diets"
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
