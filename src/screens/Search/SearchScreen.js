import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableHighlight,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import styles from "./styles";

class SearchScreen extends Component {
  state = {
    search: "",
    recipes: [],
  };

  // axios get request for ingredient entered by user

  // axios call to spoonacular recipe db api

  fetchData = async () => {
    try {
      const queryObject = { search: this.state.search };
      const options = {
        method: "GET",
        url: "https://simplkitchenapi.onrender.com/api/v1/search/ingredients",
        params: queryObject,
      };
      const response = await axios.request(options);
      console.log("API call success: ", response.data);
      // throw alert with ingredient text
      alert(JSON.stringify(response.data.foodData));
      this.setState({ recipes: response.data.foodData });
    } catch (error) {
      console.log(error);
    }
  };

  // render food data response onto screen
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(text) => this.setState({ search: text })}
          />
          <Button
            title="Search"
            onPress={() => {
              this.fetchData();
            }}
          />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate("Recipe", {
                  recipe: item,
                })
              }
            >
              <View style={styles.container}>
                <Image
                  style={styles.photo}
                  source={{
                    uri: item.image.endsWith(".png")
                      ? item.image
                      : item.image + ".jpg",
                  }}
                />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.category}>
                  {item.ingredients.join(", ")}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
}  

//   fetchData = async () => {
//     try {
//       const queryObject = { search: this.state.search };
//       const options = {
//         method: "GET",
//         url: "https://simplkitchenapi.onrender.com/api/v1/search/ingredients",
//         params: queryObject,
//       };
//       const response = await axios.request(options);
//       console.log("API call success: ", response.data);
//       // throw alert with api text
//       alert(JSON.stringify(response.data.foodData));
//       this.setState({ recipes: response.data.foodData });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // render food data response onto screen
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search"
//             onChangeText={(text) => this.setState({ search: text })}
//           />
//           <Button
//             title="Search"
//             onPress={() => {
//               this.fetchData();
//             }}
//           />
//         </View>
//         <FlatList
//           data={this.state.data}
//           renderItem={({ item }) => (
//             <TouchableHighlight
//               onPress={() =>
//                 this.props.navigation.navigate("Recipe", {
//                   recipe: item,
//                 })
//               }
//             >
//               <View style={styles.container}>
//                 <Image style={styles.photo} source={{ uri: item.image }} />
//                 <Text style={styles.title}>{item.name}</Text>
//                 <Text style={styles.category}>{item.category}</Text>
//                 <Text style={styles.category}>
//                   {item.ingredients.join(", ")}
//                 </Text>
//               </View>
//             </TouchableHighlight>
//           )}
//           numColumns={2}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       </View>
//     );
//   }
// }

export default SearchScreen;
// export default SearchScreen;

// // creat classes for search screen
// const SearchScreen = (props) => {
//   // state
//   const [search, setSearch] = useState("");
//   const [recipes, setRecipes] = useState([]);

//   // request data from api  when search term changes and only when enter is pressed
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(
//         // simplkitchen api
//         "https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search=Cucumber"
//       );
//       setRecipes(result.data.meals);
//     };
//     fetchData();
//   }, [search]);

//   // render
//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search"
//           onChangeText={(text) => setSearch(text)}
//         />
//       </View>
//       <FlatList
//         data={recipes}
//         renderItem={({ item }) => (
//           <TouchableHighlight
//             onPress={() =>
//               props.navigation.navigate("Recipe", {
//                 recipe: item,
//               })
//             }
//           >
//             <View style={styles.container}>
//               <Image style={styles.photo} source={{ uri: item.strMealThumb }} />
//               <Text style={styles.title}>{item.strMeal}</Text>
//               <Text style={styles.category}>{item.strCategory}</Text>
//             </View>
//           </TouchableHighlight>
//         )}
//         numColumns={2}
//         keyExtractor={(index) => index.toString()}
//       />
//     </View>
//   );
// };

// // styles
// const styles = StyleSheet.create({
//   btnIcon: {
//     height: 14,
//     width: 14,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#9A1D1D",
//     borderRadius: 100,
//     width: 250,
//     justifyContent: "space-around",
//     marginVertical: 10,
//     paddingHorizontal: 10,
//   },
//   searchIcon: {
//     width: 20,
//     height: 20,
//     tintColor: "black",
//   },
//   searchInput: {
//     backgroundColor: "#EDEDED",
//     color: "black",
//     width: 180,
//     height: 50,
//     paddingHorizontal: 10,
//     borderRadius: 25,
//   },
// });

// // export
// export default SearchScreen;

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const result = await axios(
// //         // simplkitchen api
// //         'https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search=${searchTerm}'
// //       );
// //       setRecipes(result.data.meals);
// //     };
// //     fetchData();
// //   }, [search]);

// //   // render
// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.searchContainer}>
// //         <TextInput
// //           style={styles.searchInput}
// //           placeholder="Search"
// //           onChangeText={(text) => setSearch(text)}
// //         />
// //       </View>
// //       <FlatList
// //         data={recipes}
// //         renderItem={({ item }) => (
// //           <TouchableHighlight
// //             onPress={() =>
// //               props.navigation.navigate("Recipe", {
// //                 recipe: item,
// //               })
// //             }
// //           >
// //             <View style={styles.container}>
// //               <Image
// //                 style={styles.photo}
// //                 source={{ uri: item.strMealThumb }}
// //               />
// //               <Text style={styles.title}>{item.strMeal}</Text>
// //               <Text style={styles.category}>{item.strCategory}</Text>
// //             </View>
// //           </TouchableHighlight>
// //         )}
// //         numColumns={2}
// //         keyExtractor={(index) => index.toString()}
// //       />
// //     </View>
// //   );
// // };

// // // styles
// // const styles = StyleSheet.create({
// //   btnIcon: {
// //     height: 14,
// //     width: 14,
// //   },
// //   searchContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#9A1D1D",
// //     borderRadius: 100,
// //     width: 250,
// //     justifyContent: "space-around",
// //     marginVertical: 10,
// //     paddingHorizontal: 10,
// //   },
// //   searchIcon: {
// //     width: 20,
// //     height: 20,
// //     tintColor: "black",
// //   },
// //   searchInput: {
// //     backgroundColor: "#EDEDED",
// //     color: "black",
// //     width: 180,
// //     height: 50,
// //     paddingHorizontal: 10,
// //     borderRadius: 25,
// //   },
// // });

// // // export
// // export default SearchScreen;
