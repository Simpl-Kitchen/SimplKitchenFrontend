import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function MenuButton(props) {
  const { title, icon, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

MenuButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.element,
};

MenuButton.defaultProps = {
  icon: <Ionicons name="ios-menu" size={24} color="black" />,
};
