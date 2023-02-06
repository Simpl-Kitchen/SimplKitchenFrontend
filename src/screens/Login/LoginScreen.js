// login screen component using axios to send a post request to the server and asks for email password and then sends it to the server and then the server sends back a response and then the response is handled and then the user is navigated to the home screen
// using an external stylesheet names styles.js in the login folder 
// export default function LoginScreen(props) {
// add spot for logo at the top center of the screen

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import axios from "axios";

// email and password are the state variables

export default function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // handleLogin function is called when the user clicks the login button

    const handleLogin = () => {
        axios
        .post("https://simplkitchen-api.onrender.com/api/v1/auth/login", {
            email: email,
            password: password,
        })
        .then((response) => {
            if (response.data === "Incorrect email or password") {
                Alert.alert("Incorrect email or password");
            } else {
                Alert.alert("Login successful");
                props.navigation.navigate("Home");
                console.response('response', response)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
        </View>
    );
}
