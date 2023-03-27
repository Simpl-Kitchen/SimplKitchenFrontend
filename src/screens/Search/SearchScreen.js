import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableHighlight,
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
      const results = response.data.foodData.results;

      // Loop through the results array and display the properties in a cleaner format
      results.forEach((item, index) => {
        console.log(
          `${index + 1}. ID: ${item.id}, Name: ${item.name}, Image: ${
            item.image
          }`
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  // render ingredients using the data inputed from the api call using axios
  renderIngredient = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressIngredient(item[0])}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: "grey" }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );

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
          renderItem={this.renderIngredient}
          keyExtractor={(item) => item.id}
          image={this.state.recipes.image}
        />
      </View>
    );
  }
}

export default SearchScreen;
