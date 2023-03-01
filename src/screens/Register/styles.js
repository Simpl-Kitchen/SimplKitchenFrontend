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
    input: {
        flex: .03,
        justifyContent: 'center',
        width: '70%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        marginBottom: 10,
        padding: 10,

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    
    button: {
        flex: .08,
        flexDirection: 'row',
        width: '30%',
        height: '15%',
        backgroundColor: '#A8DDA8',
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