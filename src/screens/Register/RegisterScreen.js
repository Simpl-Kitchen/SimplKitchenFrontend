// Register Screen that calls axios to post to the database
// imports styles from styles.js in the register folder
// asks for name, email, password but no need to confirm password
// has a register button
// has a back button to go back to the login screen

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import axios from "axios";
import { Image } from "react-native";

const { registerSimplKitchen } = require('../../utils/APICalls/SimplKitchen/user');

//The component exports a default function that takes in props as its only argument. 
//Inside the function, the component sets up four states using the useState hook, which hold the values of name, 
//username, email, and password. 
//The component also defines a handleRegister function that makes an asynchronous call to register a user 
//and navigates to the Login screen if the registration is successful. 
//If an error occurs, the component logs the error and displays an Alert message to the user. 
//The component then returns a KeyboardAvoidingView that contains several TextInput components for the user 
//to input their name, username, email, and password, 
//as well as two TouchableOpacity components to submit the form and navigate back to the Login screen.
export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handleRegister which is an asynchronous function that attempts to register a user by calling 
  //a function called registerSimplKitchen with parameters name, username, email, and password. 
  //If the registration is successful, an alert will be displayed 
  //saying "Registration successful" and the user will be navigated to the login screen. 
  //If there is an error, it will be caught and different actions will be taken depending on the type of error. 
  //If the error is due to a server response with a status code outside the 2xx range, an alert will be displayed with the error message.
  //If there is no response or an error in setting up the request, different messages will be logged to the console.
  const handleRegister = async () => {


    try {

      const register = await registerSimplKitchen(name, username, email, password)

      if (register) {

        Alert.alert("Registration successful");
        props.navigation.navigate("Login");

      }

    } catch (error) {

      if (error.response) {
        // The request was made, and the server responded with a status code
        // that falls outside the range of 2xx
        console.log('Error status:', error.response.status);
        console.log('Error data:', error.response.data);
        Alert.alert(error.response.data.msg);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={require("../../../assets/SKLogo.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="First and Last Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
