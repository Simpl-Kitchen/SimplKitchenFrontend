
import {
    StyleSheet, 
    Text,
    View,
    Image,
    
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    buttonContainer: {
      marginBottom: 20,
    },
    mealPlanContainer: {
      marginBottom: 20,
    },
    mealTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    image: {
      height: 200,
      width: "100%",
      resizeMode: "cover",
      marginBottom: 10,
    },
    servings: {
      fontSize: 16,
      marginBottom: 5,
    },
    prepTime: {
      fontSize: 16,
    },
  });
  
export default styles;