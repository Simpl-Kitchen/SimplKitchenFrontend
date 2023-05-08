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
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
  },
  ingredientInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginRight: 10,
    padding: 5,
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
  tabContainer: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    padding: 10,
  },
  tabContent: {
    flexGrow: 1,
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  instructionNumber: {
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
  },
  recipeInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  recipeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  recipeInfoText: {
    fontSize: 16,
    marginRight: 5,
  },
});

export default styles;
