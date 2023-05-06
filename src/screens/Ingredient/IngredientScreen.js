import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "react-native-elements";
import styles from "./styles";
import UnitPicker from "../../components/UnitPicker/UnitPicker";

const { width } = Dimensions.get("window");

const IngredientScreen = ({ route, navigation }) => {
  const { ingredient } = route.params;
  const baseImageUrl = "https://spoonacular.com/cdn/ingredients_250x250/";
  const [selectedUnit, setSelectedUnit] = useState(ingredient.possibleUnits[0]);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const unitShorthand = (unit) => {
    const unitMap = {
      tablespoon: "tbsp",
      teaspoon: "tsp",
      ounce: "oz",
      gram: "g",
      milliliter: "mL",
      liter: "L",
      pound: "lb",
      cup: "cup",
      pint: "pt",
      quart: "qt",
      gallon: "gal",
    };
    return unitMap[unit] || unit;
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
          <TouchableOpacity
            style={styles.unitDisplay}
            onPress={() => setPickerModalVisible(true)}
          >
            <Text>{unitShorthand(selectedUnit)}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={pickerModalVisible}
          >
            <UnitPicker
              units={ingredient.possibleUnits}
              selectedUnit={selectedUnit}
              onValueChange={handleUnitChange}
              onRequestClose={() => setPickerModalVisible(false)}
            />
          </Modal>
        </View>
        <Text style={styles.ingredientDescription}>
          {ingredient.description} {"\n\n"}
          <Text style={styles.ingredientMeasurement}>
            Common Unit Sizes: {ingredient.possibleUnits.map(unitShorthand).join(", ")}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default IngredientScreen;
