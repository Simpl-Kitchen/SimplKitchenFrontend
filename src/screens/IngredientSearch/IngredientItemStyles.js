import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 5,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 10,
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
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  addButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#A8DDA8",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonIcon: {
    fontSize: 20,
    color: "#FFF",
  },
  rowItem: {
    width: "50%",
    padding: 10,
  },
});

export default styles;
