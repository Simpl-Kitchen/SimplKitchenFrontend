// IngredientScreen.js
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import { Dimensions } from "react-native";
import styles from "./styles";

const { width } = Dimensions.get("window");

const IngredientScreen = ({ route, navigation }) => {
  const { ingredient } = route.params;
  const baseImageUrl = "https://spoonacular.com/cdn/ingredients_250x250/";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.ingredientContainer}>
        <Text style={styles.ingredientTitle}>{ingredient.name}</Text>
        <Image
          source={{ uri: baseImageUrl + ingredient.image }}
          style={{
            width: width * 0.7,
            height: width * 0.7,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        {/* Add more details about the ingredient here */}
        <Text>
          {ingredient.description} {ingredient.name}
        </Text>
      </View>
    </ScrollView>
  );
};

export default IngredientScreen;
