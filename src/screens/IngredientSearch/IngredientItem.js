// IngredientItem.js
import React from "react";
import { View, Text, Image, Button, TouchableHighlight } from "react-native";
import styles from "./styles";




  //component called IngredientItem which takes in three props: ingredient, onPress, and onAdd. 
  //When the component is rendered, it displays an image of the ingredient, the name of the ingredient, 
  //and a button to add the ingredient to a pantry. When the image or button is pressed, 
  //it calls the appropriate callback function (onPress or onAdd) with the ingredient object as an argument.
const IngredientItem = ({ ingredient, onPress, onAdd }) => (
    <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPress(ingredient)}
        style={styles.rowItem}
    >
        <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}` }} />
            <Text style={styles.title}>{ingredient.name}</Text>
            <Button title="⊕ Add To Pantry" color="#0D0C0C" onPress={() => onAdd(ingredient)} />
        </View>
    </TouchableHighlight>
);

export default IngredientItem;
