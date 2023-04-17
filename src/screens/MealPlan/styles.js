import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EFEF",
    padding: 10,
  },
  button: {
    backgroundColor: "#A8DDA8",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  mealPlan: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC79",
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: "cover",
  },
  mealPlanContent: {
    width: "100%",
  },
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

export default styles;
