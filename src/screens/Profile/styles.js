import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 10,
    alignSelf: "center",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  input: {
    height: 40,
    width: 250,
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#00BFFF",
  },
  bioInput: {
    height: 80,
  },
  buttonContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 20,
    backgroundColor: "#00BFFF",
  },
  logoutButtonContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 20,
    backgroundColor: "#FF0000",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default styles;
