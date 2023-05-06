import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Feather";

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name="arrow-left" size={24} color="#555" style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#E6E6E6",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
