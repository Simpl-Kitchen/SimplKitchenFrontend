// IngredientItem.js
import React from "react";
import { View, Text, Image, Button, TouchableHighlight } from "react-native";
import styles from "./styles";

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
