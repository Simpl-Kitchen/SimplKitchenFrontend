import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

import {
  updateUserIntolerences,
  logoutSimplKitchen,
} from "../../utils/APICalls/SimplKitchen/user";
import MenuButton from "../../components/MenuButton/MenuButton";

import styles from "./styles";

export default function ProfileScreen({ navigation }) {
  const [selected, setSelected] = React.useState([]);

  const data = [
    { key: "1", value: "Dairy" },
    { key: "2", value: "Egg" },
    { key: "3", value: "Gluten" },
    { key: "4", value: "Grain" },
    { key: "5", value: "Peanut" },
    { key: "6", value: "Seafood" },
    { key: "7", value: "Sesame" },
    { key: "8", value: "Shellfish" },
    { key: "9", value: "Soy" },
    { key: "10", value: "Sulfite" },
    { key: "11", value: "Tree Nut" },
    { key: "12", value: "Wheat" },
  ];

  const handleSave = () => {
    console.log(selected);

    try {
      updateUserIntolerences(selected);
    } catch (error) {
      console.log(error);
    }

    alert("Saved selected items");
  };

  const handleLogout = async () => {
    console.log("Logout clicked");

    try {
      await logoutSimplKitchen();
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://example.com/data");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    navigation.setOptions({
      drawerLockMode: "locked-closed",
      headerLeft: () => (
        <MenuButton
          title="Menu"
          source={require("../../../assets/icons/menu.png")}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        onSelect={() => {}}
        label="Categories"
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
