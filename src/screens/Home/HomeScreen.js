import React from 'react';
import { View, Text } from 'react-native';
import DrawerContainer from '../DrawerContainer/DrawerContainer.js';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContainer navigation={navigation} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
