//create a recipe screen that uses uses edemam api to get recipes using login overlysolemn@gmail.com and password: 6LCg9nwJ9xZgvpP
// to get the recipes from the api
// use the data to render the recipes in the home screen
// list the recipes using the flatlist component

import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import axios from "axios";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [recipeList, setRecipeList] = useState([]);

// login to edemam api using email oversolemn@gmail.com and password: 6LCg9nwJ9xZgvpP
 const APP_ID = "a1f1f9a2";

 useEffect(() => {
    axios
      .get("https://api.edamam.com/search?q=chicken&app_id=a1f1f9a2&app_key=6LCg9nwJ9xZgvpP")
      .then((response) => {
        setRecipeList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipeList} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}




// // rednder recipes from simplkitchen api through axios get request
// // use the data to render the recipes in the home screen
// // list the recipes using the flatlist component

// import React, { useState, useEffect } from "react";
// import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
// import styles from "./styles";
// import axios from "axios";

// export default function HomeScreen(props) {
//   const { navigation } = props;
//   const [recipeList, setRecipeList] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://simplkitchen-api.onrender.com/api/v1/recipes")
//       .then((response) => {
//         setRecipeList(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const onPressRecipe = (item) => {
//     navigation.navigate("Recipe", { item });
//   };

//   const renderRecipes = ({ item }) => (
//     <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
//       <View style={styles.container}>
//         <Image style={styles.photo} source={{ uri: item.image }} />
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
//       </View>
//     </TouchableHighlight>
//   );

//   return (
//     <View>
//       <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipeList} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
//     </View>
//   );
// }




// // import React, { useLayoutEffect } from "react";
// // import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
// // import styles from "./styles";
// // import { recipes } from "../../data/dataArrays";
// // import MenuImage from "../../components/MenuImage/MenuImage";
// // import { getCategoryName } from "../../data/MockDataAPI";

// // export default function HomeScreen(props) {
// //   const { navigation } = props;

// //   useLayoutEffect(() => {
// //     navigation.setOptions({
// //       headerLeft: () => (
// //         <MenuImage
// //           onPress={() => {
// //             navigation.openDrawer();
// //           }}
// //         />
// //       ),
// //       headerRight: () => <View />,
// //     });
// //   }, []);

// //   const onPressRecipe = (item) => {
// //     navigation.navigate("Recipe", { item });
// //   };

// //   const renderRecipes = ({ item }) => (
// //     <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
// //       <View style={styles.container}>
// //         <Image style={styles.photo} source={{ uri: item.photo_url }} />
// //         <Text style={styles.title}>{item.title}</Text>
// //         <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
// //       </View>
// //     </TouchableHighlight>
// //   );

// //   return (
// //     <View>
// //       <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
// //     </View>
// //   );
// // }

