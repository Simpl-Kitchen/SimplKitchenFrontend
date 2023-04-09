import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: "#888",
  },
  removeButtonContainer: {
    marginLeft: 16,
  },
  removeButton: {
    backgroundColor: "#70161E",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#98CBB0",
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  flatlistContentContainer: {
    paddingBottom: 100,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  minusButton: {
    backgroundColor: "#70161E",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  plusButton: {
    backgroundColor: "#98CBB0",
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
