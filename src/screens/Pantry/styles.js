// style screen for a pantry of ingredients and items in the home that can be used to make a recipe
// needs style for search bar, list of items, and buttons
// needs style for barcode item next to search box 
// needs style for list of items in pantry
// needs style for categories of items in pantry

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


