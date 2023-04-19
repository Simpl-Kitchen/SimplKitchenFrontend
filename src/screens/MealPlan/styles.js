import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
backgroundColor: "#F5F5F5",
},
button: {
backgroundColor: "#A8DDA8",
borderRadius: 5,
padding: 10,
marginBottom: 20,
alignItems: "center",
},
buttonText: {
color: "#FFFFFF",
fontWeight: "bold",
fontSize: 16,
},
mealPlan: {
backgroundColor: "#FFFFFF",
borderRadius: 5,
marginBottom: 20,
padding: 10,
},
mealTitle: {
fontSize: 18,
fontWeight: "bold",
marginBottom: 10,
},
image: {
width: "100%",
height: 200,
borderRadius: 5,
marginBottom: 10,
},
shoppingListItem: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
backgroundColor: "#FFFFFF",
borderRadius: 5,
padding: 10,
marginBottom: 10,
},
ingredientName: {
fontSize: 16,
fontWeight: "bold",
},
ingredientAmount: {
fontSize: 14,
},
});

export default styles;