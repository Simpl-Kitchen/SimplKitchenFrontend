// login screen component using axios to send a post request to the server and asks for email password and then sends it to the server and then the server sends back a response and then the response is handled and then the user is navigated to the home screen
// using an external stylesheet names styles.js in the login folder
// export default function LoginScreen(props) {zzzzz
// add spot for logo at the top center of the screen

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";

import { loginSimplKitchen } from "../../utils/APICalls/SimplKitchen/user";

//email and password are the state variables
//exports a default function that takes in a props object. 
//The component uses the state hook to manage the email and password input fields. 
//It also defines a handleLogin function that is called when the user clicks on the login button. 
//This function attempts to log in the user by calling a loginSimplKitchen function with the email and password inputs. 
//If the login is successful, an alert is displayed and the user is navigated to the Home screen.
//If there is an error, it is caught and appropriate error messages are displayed. 
//The component returns a KeyboardAvoidingView component that contains an image, email and password input fields, and login and 
//register buttons that call the handleLogin function and navigate to the Register screen respectively.
export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
//function called handleLogin that is an asynchronous function. 
//It attempts to log in a user by calling the loginSimplKitchen function with an email and password. 
//If the login is successful, it displays an alert saying "Login successful" and navigates to the "Home" screen. 
//If there is an error, it logs the error to the console and displays an alert with the error message. 
//The error handling code checks if there was a response from the server and logs the status and data, 
//or if there was no response, logs that fact, or if there was an error setting up the request, logs the error message.
  const handleLogin = async () => {

    try {

      const login = await loginSimplKitchen(email, password);

      if (login) {

        Alert.alert("Login successful");
        props.navigation.navigate("Home");

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
    // add spt for image at the top center of the screen
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/SKLogo.png")}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
