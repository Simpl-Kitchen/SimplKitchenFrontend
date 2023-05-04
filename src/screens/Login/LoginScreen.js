import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";

import { loginSimplKitchen } from "../../utils/APICalls/SimplKitchen/user";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tapCount, setTapCount] = useState(0);

  const handleLogin = async () => {
    try {
      const login = await loginSimplKitchen(email, password);

      if (login) {
        Alert.alert("Login successful");
        props.navigation.navigate("Home");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        Alert.alert(error.response.data.msg);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error message:", error.message);
      }
    }
  };

  const handleImageTap = () => {
    setTapCount(tapCount + 1);
    if (tapCount === 19) {
      props.navigation.navigate("HiddenScreen");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity onPress={handleImageTap}>
        <Image
          style={styles.image}
          source={require("../../../assets/SKLogo.png")}
        />
      </TouchableOpacity>
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
