// // IngredientScreen.js
// import React from "react";
// import { View, Text, ScrollView } from "react-native";
// import { Image } from "react-native-elements";
// import { Dimensions } from "react-native";
// import styles from "./styles";

// const { width } = Dimensions.get("window");

// const IngredientScreen = ({ route, navigation }) => {
//   const { ingredient } = route.params;
//   const baseImageUrl = "https://spoonacular.com/cdn/ingredients_250x250/";

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.ingredientContainer}>
//         <Text style={styles.ingredientTitle}>{ingredient.name}</Text>
//         <Image
//           source={{ uri: baseImageUrl + ingredient.image }}
//           style={{
//             width: width * 0.7,
//             height: width * 0.7,
//             borderRadius: 10,
//             marginBottom: 10,
//           }}
//         />
//         {/* Add more details about the ingredient here */}
//         <Text>
//           {ingredient.description} {ingredient.name}
//           <Text style={styles.ingredientDescription}>
//     {ingredient.description} {ingredient.name}
//   {"\n\n"}
//   <Text style={styles.ingredientMeasurement}>
//     Typical Serving Size: {ingredient.servingSize}
//   </Text>
//   {"\n\n"}
//   <Text style={styles.ingredientMeasurement}>
//     Common Unit Sizes: {ingredient.possibleUnits.join(", ")}
//   </Text>
// </Text>

//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default IngredientScreen;
// IngredientScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "react-native-elements";
import { Dimensions } from "react-native";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");

const IngredientScreen = ({ route, navigation }) => {
  const { ingredient } = route.params;
  const baseImageUrl = "https://spoonacular.com/cdn/ingredients_250x250/";
  const [selectedUnit, setSelectedUnit] = useState(ingredient.possibleUnits[0]);

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



