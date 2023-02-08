// stylesheet for a register screen component
// have input name, email, password, and confirm password
// have a register button
// have a back button to go back to the login screen
// 

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#66E59D',
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        marginBottom: 10,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    
    button: {
        width: 200,
        height: 40,
        backgroundColor: '#86bf3e',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
        
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    photo: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    image: {
        width: 500,
        height: 300,
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default styles;