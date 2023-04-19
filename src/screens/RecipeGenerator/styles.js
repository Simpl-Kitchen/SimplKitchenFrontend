import {StyleSheet} from 'react-native';

const GenerateStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: "#4CAF50",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 4,
      marginTop: 20,
    },
    buttonText: {
      color: "#FFF",
      fontSize: 18,
    },
    recipeCard: {
      width: "100%",
      marginTop: 30,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 10,
      backgroundColor: "#f9f9f9",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    recipeTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333",
    },
    recipeIngredients: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 10,
      color: "#555",
    },
    recipeInstructions: {
      fontSize: 16,
      marginTop: 10,
      color: "#777",
    },
  });

export default GenerateStyles