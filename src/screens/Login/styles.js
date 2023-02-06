//stylesheet for a login screen component
// just the styles for the login screen component
// add logo to the top of the screen centered

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
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: '#66E59D',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 10,
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
});

export default styles;
