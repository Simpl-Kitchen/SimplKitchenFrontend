import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9A1D1D",
    borderRadius: 100,
    width: 250,
    justifyContent: "space-around",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "black",
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    width: 180,
    height: 50,
  },
});

export default styles;
