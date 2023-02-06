// style component to be used in the profile screen component
// has a n image circular image that is a placeholder for the user's profile picture
/// has a place for the user's name 
// has a button that navigates to the settings screen with a cog icon
// has a logout button

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
    },

    button: {
        backgroundColor: "#FF6347",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
    },
});

export default styles;
