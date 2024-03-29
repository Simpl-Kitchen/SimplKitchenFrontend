import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    flex : "flex-start",
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,  
    shadowRadius: 2.22,
    width: "45%",
    height: 150,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 10,
    marginTop: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    alignSelf: "flex-start",

  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    alignContent: "flex-start",
    fontSize: 10,

  },
  addButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#A8DDA8",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto", // Move the add button to the right side of the row
    marginBottom: 10,
  },
  addButtonIcon: {
    fontSize: 20,
    color: "#FFF",
  },
  rowItem: {
    flex: 1,
  },
});

export default styles;
