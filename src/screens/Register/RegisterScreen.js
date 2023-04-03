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

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post("https://simplkitchenapi.onrender.com/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        console.log(token);
        if (response.data === "Email already exists") {
          Alert.alert("Email already exists");
        } else {
          Alert.alert("Registration successful");
          props.navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error registering user");
      });
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
