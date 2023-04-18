import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
    flex: 1,
    },
    topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    },
    editButton: {
    backgroundColor: "#A8DDA8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    },
    editButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    },
    container: {
    padding: 10,
    paddingBottom: 30,
    },
    title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    },
    image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
    },
    servingsInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 50,
    textAlign: "center",
    fontWeight: "bold",
    },
    servingsText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 16,
    },
    servingsNumber: {
    fontSize: 16,
    },
    shoppingListButton: {
    backgroundColor: "#A8DDA8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    },
    shoppingListButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    },
    backButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    },
    backButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    },
    saveButton: {
    backgroundColor: "#A8DDA8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    },
    saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    },
    ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    },
    ingredientInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    },
    instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    },
    instructionNumber: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
    },
    instructionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    },
    });

export default styles;