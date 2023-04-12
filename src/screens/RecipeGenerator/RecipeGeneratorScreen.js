// this will be a screen with a button at the top that says generate recipe and nothing else

import React from 'react';
import { View, Button } from 'react-native';

const RecipeGeneratorScreen = () => {
  const handleGenerateRecipe = () => {
    // TODO: Implement recipe generation logic
  };

  return (
    <View>
      <Button title="Generate Recipe" onPress={handleGenerateRecipe} />
    </View>
  );
};

export default RecipeGeneratorScreen;

