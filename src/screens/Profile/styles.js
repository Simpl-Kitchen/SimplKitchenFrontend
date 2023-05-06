import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#F0EFEF",
    alignContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignContent: "center",
  },
  button: {
    backgroundColor: "#98CBB0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "flex-end",
  },
  logoutButton: {
    backgroundColor: "#70161E",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default styles;
