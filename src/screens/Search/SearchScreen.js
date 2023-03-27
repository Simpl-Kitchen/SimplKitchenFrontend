import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
} from "react-native";

import styles from "./styles";
import token from "../Register/RegisterScreen";

// if (token = null){
//   navigation.navigate("Login");
// }

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

  // render ingredients using the data inputed from the api call using axios
  renderIngredients = ({ item }) => {
    return (
      <View style={styles.searchContainer}>
        <Text style={styles.searchInput}>{item.name}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for an ingredient"
            onChangeText={(text) => this.setState({ search: text })}
            value={this.state.search}
          />
          <Button
            title="Search"
            color="#0D0C0C"
            backgroundColor="#0D0C0C"
            onPress={this.fetchData}
          />
        </View>
        <FlatList
          data={this.state.recipes}
          renderItem={this.renderIngredients}
          keyExtractor={(item) => item.id}
          image={this.state.recipes.image}
        />
      </View>
    );
  }
}

export default SearchScreen;
