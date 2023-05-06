import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const UnitPicker = ({
  units,
  selectedUnit,
  onValueChange,
  onRequestClose,
}) => {
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
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Select Unit</Text>
        {units.map((unit) => (
          <TouchableOpacity
            key={unit}
            style={styles.unitOption}
            onPress={() => {
              onValueChange(unit);
              onRequestClose();
            }}
          >
            <Text style={styles.unitOptionText}>{unitShorthand(unit)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  unitOption: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  unitOptionText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default UnitPicker;
