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
//import axios from "axios";
//import AsyncStorage from "@react-native-async-storage/async-storage";

import {loginSimplKitchen} from "../../utils/APICalls";
import {storeToken} from "../../utils/Authorization";

// email and password are the state variables

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handleLogin function is called when the user clicks the login button

  const handleLogin = async () => {

    try {
        const response = await loginSimplKitchen(email, password);

        if (response.data === "Incorrect email or password") {

          Alert.alert("Incorrect email or password");

        } else {

          // Store the user token in AsyncStorage
          
          Alert.alert("Login successful");
          //await AsyncStorage.setItem("userToken", response.data.token);
          await storeToken(response.data.token);
          props.navigation.navigate("Pantry");
            console.log(response.data.token);
            //console.log(error);
        }
    } catch (error) {
      console.log(error);
    }
    
    
    
    // axios
    //   .post("https://simplkitchenapi.onrender.com/api/v1/auth/login", {
    //     email: email,
    //     password: password,
    //   })
    //   .then(async (response) => {
    //     if (response.data === "Incorrect email or password") {
    //       Alert.alert("Incorrect email or password");
    //     } else {
    //       // Store the user token in AsyncStorage
    //       try {
    //         await AsyncStorage.setItem("userToken", response.data.token);
    //         Alert.alert("Login successful");
    //         props.navigation.navigate("Categories");
    //         console.log(response.data.token);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
