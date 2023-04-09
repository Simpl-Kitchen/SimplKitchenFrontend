import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  itemTextContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 14,
    color: "#A5A5A5",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#A5A5A5",
  },
  removeButton: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default styles;
