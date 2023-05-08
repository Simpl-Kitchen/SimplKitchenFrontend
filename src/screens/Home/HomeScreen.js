import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import MenuButton from "../../components/MenuButton/MenuButton";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//displays a list of recipes fetched from an external API.
//It uses hooks such as useState and useEffect to manage state and perform side effects.
//The fetchData function fetches recipe data from the Spoonacular API and processes it to create a list of recipes.
//The handleSearch function is called when the user inputs a search query and fetches new data based on the query.
//The sortedRecipes variable sorts the recipes based on the sortBy state, which is toggled by the user.
//The component also includes a search bar and a filter button to sort the recipes.
//Finally, the component renders a list of recipes using the FlatList component from React Native,
//and allows the user to refresh the list by pulling down on the screen.
const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const fetchData = (searchParam, offset = 0) => {
    setRefreshing(true);
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchParam}&number=10&offset=${offset}&apiKey=e44c9f0796b4400ab3a69f1354d139a9`
    )
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((recipe) =>
          fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=e44c9f0796b4400ab3a69f1354d139a9&includeNutrition=false`
          ).then((response) => response.json())
        );
        Promise.all(promises).then((recipes) => {
          setRecipes(
            recipes.map((recipe, index) => ({
              ...data.results[index],
              ...recipe,
            }))
          );
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
    });
  }, []); // Remove sortBy dependency to disable sorting

  const handleRecipePress = (recipe) => {
    navigation.navigate("Recipe", { recipe });
  };

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
          {item.servings && <Text style={styles.info}>Servings: {item.servings}</Text>}
          {item.readyInMinutes && (
            <Text style={styles.info}>Ready in: {item.readyInMinutes} minutes</Text>
          )}
          {item.pricePerServing && (
            <Text style={styles.info}>
              Price per serving: ${(item.pricePerServing / 100).toFixed(2)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  

  const sortedRecipes = recipes
  .filter(
    (recipe) =>
      recipe.servings &&
      recipe.readyInMinutes &&
      recipe.pricePerServing
  )
  .sort((a, b) => {
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
        platform={{
          ios: "default",
          android: "default",
          web: "default",
        }}
        searchIcon={
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              setSortBy((prevSortBy) =>
                prevSortBy === "asc" ? "desc" : "asc"
              );
            }}
          >
            <FontAwesome
              name={sortBy === "asc" ? "sort-amount-asc" : "sort-amount-desc"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={sortedRecipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              const randomOffset = Math.floor(Math.random() * 100);
              fetchData(search, randomOffset);
            }}
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   SafeAreaView,
//   RefreshControl,
//   TouchableOpacity,
//   Alert,
//   Platform,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import MenuButton from "../../components/MenuButton/MenuButton";
// import styles from "./styles";

// const HomeScreen = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [sortBy, setSortBy] = useState(null);
//   const navigation = useNavigation();

//   const fetchData = () => {
//     setRefreshing(true);
//     fetch(
//       "https://api.spoonacular.com/recipes/random?number=10&apiKey=e44c9f0796b4400ab3a69f1354d139a9"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setRecipes(data.recipes);
//       })
//       .catch((error) => console.error(error))
//       .finally(() => {
//         setRefreshing(false);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//     navigation.setOptions({
//       drawerLockMode: "locked-closed",
//       headerLeft: () => (
//         <MenuButton
//           title="Menu"
//           source={require("../../../assets/icons/menu.png")}
//           onPress={() => {
//             navigation.openDrawer();
//           }}
//         />
//       ),
//       headerRight: () => (
//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => {
//             setSortBy((prevSortBy) => (prevSortBy === "asc" ? "desc" : "asc"));
//           }}
//         >
//           <Text style={styles.filterButtonText}>price ⇅</Text>
//         </TouchableOpacity>
//       ),
//     });
//   }, []);

//   const showExpirationAlert = () => {
//     Alert.alert(
//       "Check your fridge!",
//       "Remember to check the pantry and fridge for expired food.",
//       [{ text: "OK", onPress: () => console.log("Alert acknowledged") }],
//       { cancelable: false }
//     );
//   };

//   useEffect(() => {
//     const checkExpiration = () => {
//       const today = new Date();
//       if (today.getDay() === 0) {
//         showExpirationAlert();
//       }
//     };

//     if (Platform.OS !== "web") {
//       checkExpiration();
//       const interval = setInterval(checkExpiration, 86400000); // check every 24 hours
//       return () => clearInterval(interval);
//     }
//   }, []);

//   const handleAddToMealPlan = (recipe) => {
//     navigation.navigate("MealPlan", { recipe: recipe });
//   };

//   const renderRecipe = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.recipe}
//         onPress={() => navigation.navigate("Recipe", { recipe: item })}
//       >
//         <View style={styles.imageContainer}>
//           <Image style={styles.image} source={{ uri: item.image }} />
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.info}>Likes: {item.aggregateLikes} </Text>
//           <Text style={styles.info}>Servings: {item.servings}</Text>
//           <Text style={styles.info}>
//             Ready in: {item.readyInMinutes} minutes
//           </Text>
//           <Text style={styles.info}>
//             Price per serving: ${(item.pricePerServing / 100).toFixed(2)}
//           </Text>
//           <TouchableOpacity
//             style={styles.buttonContainer}
//             onPress={() => handleAddToMealPlan(item)}
//           >
//             <Text style={styles.buttonText}>Add to Meal Plan</Text>
//           </TouchableOpacity>
//           <Text style={styles.info}>
//             Gluten Free: {item.glutenFree ? "Yes" : "No"}
//           </Text>
//           <Text style={styles.info}>Vegan: {item.vegan ? "Yes" : "No"}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const sortedRecipes = recipes.sort((a, b) => {
//     if (sortBy === "asc") {
//       return a.pricePerServing - b.pricePerServing;
//     } else if (sortBy === "desc") {
//       return b.pricePerServing - a.pricePerServing;
//     } else {
//       return 0;
//     }
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={sortedRecipes}
//         renderItem={renderRecipe}
//         keyExtractor={(item) => item.id}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;
