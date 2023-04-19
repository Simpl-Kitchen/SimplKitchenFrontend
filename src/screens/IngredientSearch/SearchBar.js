// SearchBar.js
import React from "react";
import { View, TextInput, Button } from "react-native";
import styles from "./styles";

const SearchBar = ({ search, setSearch, onSearch }) => (
    <View style={styles.searchContainer}>
        <TextInput
            style={styles.searchInput}
            placeholder="Search for an ingredient"
            onChangeText={(text) => setSearch(text)}
            value={search}
        />
        <Button title="SEARCH" color="#0D0C0C" onPress={onSearch} />
    </View>
);

export default SearchBar;
