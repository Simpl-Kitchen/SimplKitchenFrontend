import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#FFFCFC",
    borderRadius: 100,
    width: 300,
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "red",
    width: 180,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9A1D1D",
    marginTop: 10,
  },
  category: {
    fontSize: 14,
    color: "#9A1D1D",
    marginTop: 10,
  },
});

export default styles;
