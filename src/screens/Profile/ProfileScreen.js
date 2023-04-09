import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  AsyncStorage,
} from "react-native";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";

import { removeToken } from "../../utils/Authorization";
import { addIngredientToPantry } from "../../utils/APICalls";

export default function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar6.png"
  );

  const handleUpdateProfile = async () => {
    try {
      // Make a PUT request to your backend server with the updated user information
      const response = await fetch("your-server-url/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          email,
          bio,
          image,
        }),
      });
      const data = await response.json();

      // If the update was successful, display a success message
      if (response.ok) {
        Alert.alert("Profile updated successfully");
      } else {
        // If there was an error updating the profile, display an error message
        Alert.alert(data.message);
      }
    } catch (error) {
      // If there was a network error or some other error, display an error message
      Alert.alert("Error updating profile. Please try again later.");
    }
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (result && result.assets && result.assets[0]) {
      const selectedImage = result.assets[0].uri;
      if (
        selectedImage !== "https://bootdey.com/img/Content/avatar/avatar6.png"
      ) {
        setImage(selectedImage);
      }
    }
  };

  const handleLogout = async () => {
    // remove the user's token from AsyncStorage
    //await AsyncStorage.removeItem("token");
    await removeToken();
    // navigate to the login screen
    props.navigation.navigate("Login");
    Alert.alert("Logged out successfully");
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSelectImage}>
            <Image style={styles.avatar} source={{ uri: image }} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Bio"
              value={bio}
              onChangeText={(text) => setBio(text)}
              multiline={true}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButtonContainer}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
