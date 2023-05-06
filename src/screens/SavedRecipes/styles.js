import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  noRecipesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noRecipesText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#777",
  },
  recipeList: {
    flex: 1,
    width: "100%",
  },
  recipeContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F9F9F9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#97DF99",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  recipeIngredients: {
    fontSize: 14,
    marginVertical: 5,
    color: "#555",
  },
  recipePrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  recipeImage: {
    height: 160,
    marginVertical: 8,
    borderRadius: 10,
  },
  totalCost: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
  },
});

export default styles;
