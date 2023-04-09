import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  amount: {
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  emptyText: {
    fontSize: 20,
    color: "#666",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});

export default styles;
