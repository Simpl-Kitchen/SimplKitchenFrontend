import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
  },
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row", // align icon and text horizontally
    alignItems: "center", // center vertically
    marginVertical: 10,
  },
  icon: {
    marginRight: 10, // add spacing between icon and text
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

export default styles;
