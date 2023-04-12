// SearchScreen.js
import React, { useState, useEffect } from "react";
import { View, FlatList} from "react-native";
import { SearchBar } from "react-native-elements";
import IngredientItem from "./IngredientItem";
import { Image } from "react-native-elements";
import { Dimensions } from "react-native";
import styles from "./styles";

//import { getIngredientsByName, addIngredientToPantry } from "../../utils/APICalls";
import { searchIngredientsByName } from "../../utils/APICalls/Spoonacular/ingredients";
import { addIngredientToPantry } from "../../utils/APICalls/SimplKitchen/pantry";
import MenuButton from "../../components/MenuButton/MenuButton";

const { width } = Dimensions.get("window");

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const fetchData = async () => {
    try {
      const ingredientSearch = await searchIngredientsByName(search);
      const ingredients = ingredientSearch.results;
      setIngredients(ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddIngredient = (ingredient) => {
    try {
      addIngredientToPantry(ingredient);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressIngredient = (ingredient) => {
    navigation.navigate("Ingredient", { ingredient });
  };

  const renderIngredient = ({ item }) => (
    <IngredientItem
      key={item.id}
      ingredient={item}
      onPress={onPressIngredient}
      onAdd={handleAddIngredient}
    />
  );

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
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        platform="ios"
        placeholder="Search for ingredients..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={fetchData}
      />
      <View style={styles.carouselContainer}>
        <FlatList
          data={ingredients}
          numColumns={2}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

const IngredientImage = ({ uri }) => (
  <Image
    source={{ uri }}
    style={{
      width: width / 2 - 20,
      height: width / 2 - 20,
      borderRadius: 10,
      marginBottom: 10,
    }}
  />
);

export default SearchScreen;
