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

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        placeholder="Name"
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
