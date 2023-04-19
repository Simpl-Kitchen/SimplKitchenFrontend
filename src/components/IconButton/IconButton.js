import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import iconStyles from './iconStyles';

const IconButton = ({ iconName, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[iconStyles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={iconName} style={iconStyles.icon} />
    </TouchableOpacity>
  );
};

export default IconButton;
