import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  button: {
    backgroundColor: "#97DF99",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  mealPlan: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginBottom: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  shoppingListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ingredientAmount: {
    fontSize: 14,
    color: "#777",
  },
});

export default styles;
