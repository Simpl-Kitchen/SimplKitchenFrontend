import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
    },
    mealPlan: {
      margin: 20,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    mealTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    image: {
      width: "100%",
      height: 230,
      marginBottom: 10,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    button: {
      marginVertical: 10,
    },
  });

export default styles;