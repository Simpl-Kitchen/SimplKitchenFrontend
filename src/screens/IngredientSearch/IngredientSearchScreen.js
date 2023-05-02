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



  // a functional component called IngredientSearchScreen. 
  //It takes in a navigation prop which is used to navigate to other screens. 
  //Inside the component, there are several state variables defined using the useState hook. 
  //There is also an useEffect hook that fetches data when the component mounts and sets some options for the navigation header. 
  //The fetchData function is an asynchronous function that calls an external API to search for ingredients based on the search state. 
  //When the search is successful, the results are stored in the ingredients state variable and rendered 
  //as a list of IngredientItem components using a FlatList. 
  //There are also several helper functions defined to handle adding an ingredient to the pantry and navigating to the ingredient details screen.
const IngredientSearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const fetchData = async () => {
    try {
      const ingredientSearch = await searchIngredientsByName(search);
      const ingredients = ingredientSearch.results;
      console.log(ingredients[0].possibleUnits)
      setIngredients(ingredients);
    } catch (error) {
      console.log(error);
    }
  };




  // a function named handleAddIngredient that takes in an ingredient parameter. 
  //The function attempts to add the ingredient to the pantry by calling addIngredientToPantry, 
  //and if an error occurs during this process, it logs the error to the console.
  const handleAddIngredient = (ingredient) => {
    try {
      addIngredientToPantry(ingredient);
    } catch (error) {
      console.log(error);
    }
  };




  // a function named handleAddIngredient that takes in an ingredient parameter. 
  //The function attempts to add the ingredient to the pantry by calling addIngredientToPantry, 
  //and if an error occurs during this process, it logs the error to the console.
  const onPressIngredient = (ingredient) => {
    navigation.navigate("Ingredient", { ingredient });
  };




  // a function called renderIngredient that takes an object with a property called item as an argument. 
  //Within the function, it returns an instance of the IngredientItem component with the item property passed as a prop. 
  //It also attaches an onPress event handler and an onAdd event handler to the component. 
  //The key prop is set to the id property of the item object to ensure that each rendered component has a unique identifier.
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

export default IngredientSearchScreen;
