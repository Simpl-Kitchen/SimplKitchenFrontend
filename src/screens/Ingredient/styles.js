import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  ingredientContainer: {
    flex: 1,
    alignItems: "center",
  },
  ingredientTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  ingredientDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  ingredientMeasurement: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
  },
});

export default styles;
