import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import MenuButton from "../../components/MenuButton/MenuButton";
import {
  updateUserIntolerences,
  updateUserDiets,
  logoutSimplKitchen,
  getUserInformation,
} from "../../utils/APICalls/SimplKitchen/user";

import styles from "./styles";


//component called ProfileScreen which renders a user profile page. 
//The page has two multiple select lists of dietary preferences and intolerances. 
//The component uses the useState and useEffect hooks to manage component state and fetch user information when the component mounts. 
//The handleSave function is executed when the user saves their selections, and it calls two functions to update the user's preferences.
//The handleLogout function logs the user out.
export default function ProfileScreen(props) {
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  const data1 = [
    { key: "1", value: "Dairy" },
    { key: "2", value: "Egg" },
    { key: "3", value: "Gluten" },
    { key: "4", value: "Grain" },
    { key: "5", value: "Peanut" },
    { key: "6", value: "Seafood" },
    { key: "7", value: "Sesame" },
    { key: "8", value: "Shellfish" },
    { key: "9", value: "Soy" },
    { key: "10", value: "Sulfite" },
    { key: "11", value: "Tree Nut" },
    { key: "12", value: "Wheat" },
  ];

  const data2 = [
    { key: "1", value: "Gluten Free" },
    { key: "2", value: "Ketogenic" },
    { key: "3", value: "Lacto-Vegetarian" },
    { key: "4", value: "Ovo-Vegetarian" },
    { key: "5", value: "Vegan" },
    { key: "6", value: "Pescetarian" },
    { key: "7", value: "Paleo" },
    { key: "8", value: "Primal" },
    { key: "9", value: "LowFODMAP" },
    { key: "10", value: "Whole30" },
  ];



  //function called handleSave that makes two API calls to update userIntolerances and userDiets with selected values. 
  //If either API call fails, an error is logged to the console. After both API calls complete successfully, an alert message 
  //is shown to the user indicating that the selected items have been saved.
  const handleSave = async () => {
    try {
      await updateUserIntolerences(selected1);
      await updateUserDiets(selected2);
    } catch (error) {
      console.log(error);
    }
    alert("Saved selected items");
  };



  //defines a function called handleLogout. 
  //The function is an asynchronous function, denoted by the async keyword. When the function is called, 
  //it logs a message to the console saying "Logout clicked". Then it tries to call a function called logoutSimplKitchen() 
  //using the await keyword, which means it will wait for that function to finish before continuing. 
  //If an error occurs during the execution of logoutSimplKitchen(), the function catches the error and does nothing.
  const handleLogout = async () => {
    console.log("Logout clicked");
    try {
      await logoutSimplKitchen();
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const userInfo = await getUserInformation();
      console.log(userInfo);
      setUserInfo(userInfo);
    }
    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <MultipleSelectList
        setSelected={setSelected1}
        data={data1}
        save="value"
        onSelect={() => {}}
        label="Intolerances"
      />
      <MultipleSelectList
        setSelected={setSelected2}
        data={data2}
        save="value"
        onSelect={() => {}}
        label="Diets"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text
      style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    {userInfo && (
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>
          Logged in as {userInfo.userResponse.username}
        </Text>
      </View>
    )}
  </View>
  
  );
}