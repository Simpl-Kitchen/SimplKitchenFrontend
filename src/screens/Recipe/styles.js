import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    height: 200,
    width: "100%",
    marginBottom: 16,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  servingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  servingsText: {
    fontSize: 18,
    marginRight: 12,
  },
  servingsInput: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
  },
  ingredientInput: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    marginRight: 8,
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
  },
  instructionInput: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    marginRight: 8,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default styles;
