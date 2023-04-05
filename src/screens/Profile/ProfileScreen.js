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

import {removeToken} from "../../utils/Authorization";
import {addIngredientToPantry} from "../../utils/APICalls";

export default function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar6.png"
  );

  const handleUpdateProfile = () => {
    // TODO: Add update profile logic here
    // update the user's name, email, bio, and image

    Alert.alert("Profile updated successfully");
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets);
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
            <Image style={styles.avatar} source={{ assets: image }} />
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
