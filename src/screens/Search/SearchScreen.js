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

class SearchScreen extends Component {
  state = {
    search: "",
    recipes: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  // axios get request for ingredient entered by user
  fetchData = async () => {
    // const result = await axios(
    //   `https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search=${this.state.search}`
    // );
    
    const queryObject = {}
    queryObject.search = this.state.search;

    const options = {
      method: "GET",
      url: `https://simplkitchenapi.onrender.com/api/v1/search/ingredients`,
      params: queryObject
  }

  const searchResults = await axios.request(options).then(function (response) {
      //console.log(response.data);
      return response.data;
  }).catch(function (error) {
    console.log(error);
  })
  console.log(JSON.stringify(searchResults.foodData));

  // const renderUser = ({item}) => {
  //   return (
  //     <View style={{margin:10, borderWidth:0.5,padding:10 }}>
  //       <Text style={{color:"black", fontsize:16,fontWeight:"bold"}}>
          
  //       </Text>
  //   );
  // }
    
    // const result = axios.get(`https://simplkitchenapi.onrender.com/api/v1/search/ingredients?search=${this.state.search}`).then(function (response) {
    //   console.log(response.data);
    //   return response.data;
    // }).catch(function(error){
    //   console.log(error);
    // })
    //console.log(result);
    // this.setState({ recipes: result.data.meals });//This is for recipes
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Button title="Search" onPress={this.fetchData} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={(text) => this.setState({ search: text })}
          />
        </View>
        <FlatList
          data={this.state.recipes}
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
                  source={{ uri: item.strMealThumb }}
                />
                <Text style={styles.title}>{item.strMeal}</Text>
                <Text style={styles.category}>{item.strCategory}</Text>
              </View>
            </TouchableHighlight>
          )}
          numColumns={2}
          keyExtractor={(index) => index.toString()}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9A1D1D",
    borderRadius: 100,
    width: 250,
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "black",
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    width: 180,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
});
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
