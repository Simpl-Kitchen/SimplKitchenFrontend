// needs to get ingredients from the database
// needs to display ingredients in a list
// needs to have a button to add ingredients 
// needs to have a button to remove ingredients
// needs to have categories for ingredients (produce, dairy, meat, etc.)
// needs to haev a preset category for ingredients 
// search function for ingredients at the top of screen and barcode scanner 
// needs to have a button to add ingredients to the shopping list
// needs to have a button to add ingredients to the pantry
// needs to have authorization
// Dan needs you to add some "Token" thing


//import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Keyboard,
// } from "react-native";
// import axios from "axios";
// import Carousel from "react-native-snap-carousel";

// const PantryScreen = () => {
//   const [ingredients, setIngredients] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const carouselRef = useRef(null);

//   fetchData = async () => {
//     try {
//       const queryObject = { search: this.state.search };
//       const options = {
//         method: "GET",
//         url: "https://simplkitchenapi.onrender.com/api/v1/search/ingredients",
//         params: queryObject,
//       };
//       const response = await axios.request(options);
//       const results = response.data.foodData.results;

//       // Loop through the results array and display the properties in a cleaner format
//       results.forEach((item, index) => {
//         console.log(
//           `${index + 1}. ID: ${item.id}, Name: ${item.name}, Image: ${
//             item.image
//           }`
//         );
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   renderIngredient = ({ item }) => (
//     <TouchableHighlight
//       underlayColor="rgba(73,182,77,0.9)"
//       onPress={() => onPressIngredient(item[0])}
//     >
//       <View style={styles.container}>
//         <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
//         <Text style={styles.title}>{item[0].name}</Text>
//         <Text style={{ color: "grey" }}>{item[1]}</Text>
//       </View>
//     </TouchableHighlight>
//   );

//   const handleSearch = () => {
//     Keyboard.dismiss(); // dismiss keyboard when button is pressed
//     const results = ingredients.filter((ingredient) =>
//       ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setSearchResults(results);
//     carouselRef.current.snapToItem(0); // reset carousel to first slide
//   };

// //   const handleIngredientClick = async (ingredientName) => {
// //     try {
// //       const options = {
// //         method: 'GET',
// //         url: 'https://simplkitchenapi.onrender.com/api/v1/search/ingredients',
// //         params: {ingredients: ingredientName},
// //         headers: {'Content-Type': 'application/json'}
// //       };
// //       const response = await axios.request(options);
// //       console.log("API call success: ", response.data);
// //       // throw alert with ingredient text
// //       console.log(response.data.foodData);
// //       this.setState({ recipes: response.data.foodData });
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.slide}
//       onPress={() => handleIngredientClick(item.name)}
//     >
//       <Text style={styles.title}>{item.name}</Text>
//       <Text>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search for an ingredient"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={handleSearch}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//           <Text style={styles.searchButtonText}>Search</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.carouselContainer}>
//         <Carousel
//           ref={carouselRef}
//           data={searchResults.length > 0 ? searchResults : ingredients}
//           renderItem={renderItem}
//           sliderWidth={300}
//           itemWidth={280}
//         />
//       </View>
//     </View>
//   );
// };

import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";

import styles from "./styles";

const PantryScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const fetchData = async () => {
    try {
      const queryObject = { search };
      const options = {
        method: "GET",
        url: "https://simplkitchenapi.onrender.com/api/v1/search/ingredients",
        params: queryObject,
      };
      const response = await axios.request(options);
      const results = response.data.foodData.results;

      // Append image url to image
      results.forEach((item) => {
        item.image = `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`;
      });

      setIngredients(results);
    } catch (error) {
      console.log(error);
    }
  };

  const onPressIngredient = (ingredient) => {
    navigation.navigate("Ingredient", { ingredient });
  };

  const renderIngredient = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressIngredient(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an ingredient"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <Button title="Search" color="#0D0C0C" onPress={fetchData} />
      </View>
      <FlatList
        data={ingredients}
        renderItem={renderIngredient}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "top",
//     justifyContent: "top",
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "top",
//     marginBottom: 20,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
//   searchButton: {
//     backgroundColor: "#0099ff",
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   searchButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   carouselContainer: {
//     height: 300,
//   },
//   slide: {
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

export default PantryScreen;
