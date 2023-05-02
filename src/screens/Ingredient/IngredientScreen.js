
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import { Dimensions } from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");
//The code defines a function component called IngredientScreen that takes in two props, route and navigation. 
//The route prop contains information about the ingredient being displayed, while the navigation prop provides a way to navigate to other screens in the app.
//The code uses the useState hook to define a state variable called selectedUnit, which is initially set to the first possible unit of the ingredient. 
//The rest of the code defines a handleUnitChange function that updates the selectedUnit variable when the user selects a different unit from a Picker component. 
//The component displays the name, image, description, serving size, and possible units of the ingredient using various Text, Image, and Picker components styled with CSS.
const IngredientScreen = ({ route, navigation }) => {
  const { ingredient } = route.params;
  const baseImageUrl = "https://spoonacular.com/cdn/ingredients_250x250/";
  const [selectedUnit, setSelectedUnit] = useState(ingredient.possibleUnits[0]);




  //function called handleUnitChange that takes in a parameter unit. 
  //Within the function, it sets the value of a variable called 
  //selectedUnit to the value of the unit parameter.
  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };



  

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <View style={styles.pickerContainer}>
          <Text style={styles.ingredientMeasurement}>Select Unit:</Text>
          <Picker
            selectedValue={selectedUnit}
            onValueChange={handleUnitChange}
            style={styles.picker}
          >
            {ingredient.possibleUnits.map((unit) => (
              <Picker.Item key={unit} label={unit} value={unit} />
            ))}
          </Picker>
        </View>
        <Text style={styles.ingredientDescription}>
          {ingredient.description} {"\n\n"}
          <Text style={styles.ingredientMeasurement}>
            Typical Serving Size: {ingredient.servingSize} {"\n\n"}
            Common Unit Sizes: {ingredient.possibleUnits.join(", ")}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default IngredientScreen;



