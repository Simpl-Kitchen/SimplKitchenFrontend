// basic profile screen 
// shows the user's profile picture, name, and a logout button
// shows cog icon button that navigates to the settings screen
// 

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function ProfileScreen(props) {
    const { navigation } = props;
    const [user, setUser] = useState(null);
    
    return (
        <View style={styles.container}>
        <Image
            source={require("../../../assets/icons/placeholder.png")}
            style={styles.image}
        />
        <Text style={styles.name}>test</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Settings")}
        >
            <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        </View>
    );
    }


ProfileScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
};

// on press of the logout button, the user is logged out and navigated to the login screen
// onPress login button, the user is navigated to the login screen , onPress={() => navigation.navigate("Login")}