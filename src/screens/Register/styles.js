// stylesheet for a register screen component
// have input name, email, password, and confirm password
// have a register button
// have a back button to go back to the login screen
//

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginBottom: 10,
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
    fontSize: 20,
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
