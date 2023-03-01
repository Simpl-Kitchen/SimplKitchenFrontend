//stylesheet for a login screen component
// just the styles for the login screen component
// add logo to the top of the screen centered

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#86bf3e",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: 300,
    height: 40,
    backgroundColor: "#A8DDA8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "#EFFAD3",
    borderWidth: 1,
    marginBottom: 0,
    marginTop: 20,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    backgroundColor: "#A8DDA8",
    fontSize: 20,
    flexDirection: "row",
  },
  photo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  image: {
    width: 500,
    height: 300,
    marginBottom: 10,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default styles;
