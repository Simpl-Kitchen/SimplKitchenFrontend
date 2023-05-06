import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const SearchBar = ({ search, setSearch, onSearch }) => (
    <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for an ingredient"
                onChangeText={(text) => setSearch(text)}
                value={search}
            />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
    </View>
);

export default SearchBar;
