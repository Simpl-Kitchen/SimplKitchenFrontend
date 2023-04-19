// components/IngredientItem.js
import React from 'react';
import { View, Text, Image, Button, TouchableHighlight } from 'react-native';
import styles from '../../screens/Search/styles';

const IngredientItem = ({ item, onPressIngredient, onAddToPantry }) => {
  return (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressIngredient(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.name}</Text>
        <Button title="⊕ Add To Pantry" color="#0D0C0C" onPress={() => onAddToPantry(item)} />
      </View>
    </TouchableHighlight>
  );
};

export default IngredientItem;
