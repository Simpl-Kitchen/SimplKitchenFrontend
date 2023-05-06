import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    alignItems: "left",
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,

  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

export default styles;
