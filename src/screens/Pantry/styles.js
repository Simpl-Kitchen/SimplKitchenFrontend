import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  // photo: {
  //   width: 50,
  //   height: 50,
  //   marginRight: 10,
  // },
  photo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    fontStyle: "italic",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  ingredientsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  ingredientContainer: {
    width: '48%',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
