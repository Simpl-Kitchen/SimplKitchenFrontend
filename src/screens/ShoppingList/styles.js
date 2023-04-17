import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ...
  shoppingListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  ingredientName: {
    fontSize: 18,
  },
  ingredientAmount: {
    fontSize: 16,
    color: "#777",
  },
});
