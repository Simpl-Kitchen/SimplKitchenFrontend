import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EFEF",
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
  addButton: {
    backgroundColor: "#22aa88",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
    backgroundColor: "#B0B4B33A",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },  
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  filterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  filterButton:{
    backgroundColor: "#A8DDA8",
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10,
  }

});

export default styles;
