import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

import MenuButton from "../../components/MenuButton/MenuButton";

//DrawerContainer that takes in a props object. 
//The function returns a View component that contains a View component with multiple MenuButton components.
// Each MenuButton represents a menu item that when pressed, navigates to a specific screen and closes the drawer. 
//The specific screen to navigate to is determined by the navigation object passed in through props. 
//The styles object contains the styling information for the content and container components.
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
          source={require("../../../assets/icons/pantry.png")}
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
          source={require("../../../assets/icons/RecipeGenerator.png")}
          onPress={() => {
            navigation.navigate("RecipeGenerator");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Shopping List"
          source={require("../../../assets/icons/list.png")}
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

// Add drawer lock mode to screen options which prevents the drawer from being opened. 
//It also adds a headerLeft button that opens the drawer when pressed. 
//The menu button is created using a MenuButton component and an image file.
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
