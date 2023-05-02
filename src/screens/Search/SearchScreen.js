import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";

//displays a list of recipes fetched from an external API. 
//It uses hooks such as useState and useEffect to manage state and perform side effects. 
//The fetchData function fetches recipe data from the Spoonacular API and processes it to create a list of recipes.
//The handleSearch function is called when the user inputs a search query and fetches new data based on the query. 
//The sortedRecipes variable sorts the recipes based on the sortBy state, which is toggled by the user. 
//The component also includes a search bar and a filter button to sort the recipes. 
//Finally, the component renders a list of recipes using the FlatList component from React Native, 
//and allows the user to refresh the list by pulling down on the screen.
const SearchScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();



  //fetchData that takes in a searchParam parameter. 
  //Within the function, it sets a state variable called refreshing to true 
  //and then makes an API call to the Spoonacular recipe API using the fetch function. 
  //It then converts the response to JSON and extracts an array of recipe objects from the results field.

  //For each recipe, it then creates a promise that makes another API call to get more detailed information on that recipe. 
  //It uses Promise.all to wait for all of these promises to resolve before mapping over the resulting data and combining it with the original recipe data.
  //Finally, it sets the state variable recipes to this combined data and sets refreshing back to false.
  const fetchData = (searchParam) => {
    setRefreshing(true);
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchParam}&number=10&apiKey=e44c9f0796b4400ab3a69f1354d139a9`
    )
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((recipe) =>
          fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=e44c9f0796b4400ab3a69f1354d139a9&includeNutrition=false`
          ).then((response) => response.json())
        );
        Promise.all(promises).then((recipes) => {
          setRecipes(recipes.map((recipe, index) => ({ ...data.results[index], ...recipe })));
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData(""); // Fetch all recipes initially
  }, []);



//When handleSearch is called, it calls a function called fetchData with the value of a variable called search.
  const handleSearch = () => {
    fetchData(search);
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
      headerRight: () => (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setSortBy((prevSortBy) => (prevSortBy === "asc" ? "desc" : "asc"));
          }}
        >
          <Text style={styles.filterButtonText}>price ⇅</Text>
        </TouchableOpacity>
      ),
    });
  }, []); // Remove sortBy dependency to disable sorting


  //takes in a recipe object as an argument. 
  //When called, it uses the navigation object to navigate to the "Recipe" screen, passing the recipe object as a parameter.
  const handleRecipePress = (recipe) => {
    navigation.navigate("Recipe", { recipe });
  };


  //takes an object as an argument with a property called item. 
  //The function returns a TouchableOpacity component with styling and an onPress event handler. 
  //The component includes an image and several text components displaying information about a recipe, including its title, servings, cook time, and price per serving. 
  //The data for the recipe is accessed through the item property of the argument passed to the renderRecipe function.
  const renderRecipe = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.recipe}
        onPress={() => handleRecipePress(item)}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>Servings: {item.servings}</Text>
          <Text style={styles.info}>
            Ready in: {item.readyInMinutes} minutes
          </Text>
          <Text style={styles.info}>
            Price per serving: ${(item.pricePerServing / 100).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const sortedRecipes = recipes.sort((a, b) => {
    if (sortBy === "asc") {
      return a.pricePerServing - b.pricePerServing;
    } else if (sortBy === "desc") {
      return b.pricePerServing - a.pricePerServing;
    } else {
      return 0;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Search for recipes..."
        onChangeText={setSearch}
        value={search}
        onSubmitEditing={handleSearch}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        lightTheme
      />
      <FlatList
        data={sortedRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
