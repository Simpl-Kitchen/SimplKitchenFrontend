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

// email and password are the state variables

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handleLogin function is called when the user clicks the login button

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
