import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

import MenuButton from "../../components/MenuButton/MenuButton";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.content}>
        <MenuButton
          title="Home"
          icon={<Icon name="home" size={20} />}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Profile"
          icon={<Icon name="user" size={20} />}
          onPress={() => {
            navigation.navigate("Profile");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Search"
          icon={<Icon name="search" size={20} />}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Recipe Generator"
          icon={<Icon name="magic" size={20} />}
          onPress={() => {
            navigation.navigate("RecipeGenerator");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Meal Plan"
          icon={<Icon name="cutlery" size={20} />}
          onPress={() => {
            navigation.navigate("MealPlan");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Pantry"
          icon={<Icon name="shopping-basket" size={20} />}
          onPress={() => {
            navigation.navigate("Pantry");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Shopping List"
          icon={<Icon name="list" size={20} />}
          onPress={() => {
            navigation.navigate("ShoppingList");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Saved Recipes"
          icon={<Icon name="heart" size={20} />}
          onPress={() => {
            navigation.navigate("SavedRecipes");
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

DrawerContainer.navigationOptions = ({ navigation }) => ({
  drawerLockMode: "locked-closed",
  headerLeft: () => (
    <MenuButton
      icon={<Icon name="bars" size={20} />}
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  ),
});
