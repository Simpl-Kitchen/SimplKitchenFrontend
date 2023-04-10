import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  recipe: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  textContainer: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  summary: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 10,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default styles;
