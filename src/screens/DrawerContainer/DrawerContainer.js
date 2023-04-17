import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Search"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Home"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Meal Plan"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("MealPlan");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Pantry"
          source={require("../../../assets/icons/Pantry.png")}
          onPress={() => {
            navigation.navigate("Pantry");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Profile"
          source={require("../../../assets/icons/profile.png")}
          onPress={() => {
            navigation.navigate("Profile");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Recipe Generator"
          source={require("../../../assets/icons/placeholder.png")}
          onPress={() => {
            navigation.navigate("RecipeGenerator");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Shopping List"
          source={require("../../../assets/icons/placeholder.png")}
          onPress={() => {
            navigation.navigate("ShoppingList");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

// Add drawer lock mode to screen options
DrawerContainer.navigationOptions = ({ navigation }) => ({
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
