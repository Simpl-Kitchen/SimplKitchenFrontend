// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import MenuButton from "../../components/MenuButton/MenuButton";
// import IconButton from "../../components/IconButton/IconButton";

// import styles from "./styles";

// const {
//   getUsersIngredients,
//   removeIngredientFromPantry,
//   updateIngredientAmount,
// } = require("../../utils/APICalls/SimplKitchen/pantry");



// const PantryScreen = ({ navigation, route }) => {
//   const [pantryIngredients, setPantryIngredients] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

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
//     });
//   }, []);



//   const fetchData = async () => {
//     try {
//       const results = await getUsersIngredients();
//       setPantryIngredients(results.ingredients);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAddIngredient = (ingredient) => {
//     setPantryIngredients([...pantryIngredients, ingredient]);
    
//   };
  

//   const onRemoveIngredient = async (index) => {
//     try {
//       if (pantryIngredients[index].amount > 1) {
//         pantryIngredients[index].amount -= 1;
//         await updateIngredientAmount(pantryIngredients[index]);
//       } else {
//         await removeIngredientFromPantry(pantryIngredients[index]);
//       }
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   //If any errors occur, they are logged to the console.
//   const onAddIngredient = async (index) => {
//     try {
//       pantryIngredients[index].amount += 1;
//       await updateIngredientAmount(pantryIngredients[index]);
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   };



//   const renderItem = ({ item, index }) => (
//     <View style={styles.itemContainer}>
//       <Image
//         style={styles.photo}
//         source={{
//           uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.pictureURL}`,
//         }}
//       />
//       <View style={styles.itemContent}>
//         <Text style={styles.title}>{item.ingredientName}</Text>
//         <View style={styles.quantityContainer}>
//           <IconButton
//             iconName="minus"
//             onPress={() => onRemoveIngredient(index)}
//           />
//           <Text style={styles.quantity}>{item.amount}</Text>
//           <IconButton iconName="plus" onPress={() => onAddIngredient(index)} />
//         </View>
//       </View>
//       <IconButton
//         iconName="trash"
//         onPress={() => onRemoveIngredient(index)}
//         style={styles.removeButton}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={pantryIngredients}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//         ListEmptyComponent={() => (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>Your pantry is empty</Text>
//           </View>
//         )}
//       />
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() =>
//           navigation.navigate("IngredientSearch", { screen: "IngredientSearch" })
//         }
//       >
//         <Text style={styles.addButtonText}>Add Ingredient</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default PantryScreen; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import MenuButton from "../../components/MenuButton/MenuButton";
import IconButton from "../../components/IconButton/IconButton";

import styles from "./styles";

const {
  getUsersIngredients,
  removeIngredientFromPantry,
  updateIngredientAmount,
} = require("../../utils/APICalls/SimplKitchen/pantry");

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const PantryScreen = ({ navigation, route }) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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



  const fetchData = async () => {
    try {
      const results = await getUsersIngredients();
      setPantryIngredients(results.ingredients);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  const handleAddIngredient = (ingredient) => {
    setPantryIngredients([...pantryIngredients, ingredient]);
    
  };
  

  const onRemoveIngredient = async (index) => {
    try {
      if (pantryIngredients[index].amount > 1) {
        pantryIngredients[index].amount -= 1;
        await updateIngredientAmount(pantryIngredients[index]);
      } else {
        await removeIngredientFromPantry(pantryIngredients[index]);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };


  //If any errors occur, they are logged to the console.
  const onAddIngredient = async (index) => {
    try {
      pantryIngredients[index].amount += 1;
      await updateIngredientAmount(pantryIngredients[index]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image
        style={styles.photo}
        source={{
          uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.pictureURL}`,
        }}
      />
      <View style={styles.itemContent}>
        <Text style={styles.title}>{item.ingredientName}</Text>
        <View style={styles.quantityContainer}>
          <IconButton
            iconName="minus"
            onPress={() => onRemoveIngredient(index)}
          />
          <Text style={styles.quantity}>{item.amount}</Text>
          <IconButton iconName="plus" onPress={() => onAddIngredient(index)} />
        </View>
      </View>
      <IconButton
        iconName="trash"
        onPress={() => onRemoveIngredient(index)}
        style={styles.removeButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pantryIngredients}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your pantry is empty</Text>
          </View>
        )}
        refreshing={false}
        onRefresh={fetchData}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("IngredientSearch", { screen: "IngredientSearch" })
        }
      >
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>
    </View>
  );
      }
      
export default PantryScreen;  