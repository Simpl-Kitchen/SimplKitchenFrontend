import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Jace Test</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
              electram expetendis, omittam deseruisse consequuntur ius an,
            </Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>button</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>button 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#98CBB0",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
    color: "#A8DDA8",
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: "#A8DDA8",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#000000",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#A8DDA8",
  },
});


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   KeyboardAvoidingView,
//   Image,
//   ScrollView,
// } from 'react-native';
// import styles from './styles';
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';

// export default function ProfileScreen(props) {
//   const [name, setName] = useState(props.route.params.name);
//   const [email, setEmail] = useState(props.route.params.email);
//   const [bio, setBio] = useState(props.route.params.bio);
//   const [image, setImage] = useState(
//     props.route.params.image ||
//       'https://bootdey.com/img/Content/avatar/avatar6.png'
//   );

//   const handleUpdateProfile = () => {
//     axios
//       .put('https://simplkitchenapi.onrender.com/api/v1/auth/profile', {
//         name: name,
//         email: email,
//         bio: bio,
//         image: image,
//       })
//       .then((response) => {
//         Alert.alert('Profile updated successfully');
//       })
//       .catch((error) => {
//         console.log(error);
//         Alert.alert('Error updating profile');
//       });
//   };

//   const handleSelectImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Sorry, we need camera roll permissions to make this work!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync();
//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   return (
//     <ScrollView>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}>
//         <View style={styles.header}></View>
//         <TouchableOpacity onPress={handleSelectImage}>
//           <Image style={styles.avatar} source={{ uri: image }} />
//         </TouchableOpacity>
//         <View style={styles.body}>
//           <View style={styles.bodyContent}>
//             <TextInput
//               style={styles.input}
//               placeholder="Name"
//               value={name}
//               onChangeText={(text) => setName(text)}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Bio"
//               value={bio}
//               onChangeText={(text) => setBio(text)}
//               multiline={true}
//             />
//             <TouchableOpacity
//               style={styles.buttonContainer}
//               onPress={handleUpdateProfile}>
//               <Text style={styles.buttonText}>Update Profile</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </ScrollView>
//   );
// }
