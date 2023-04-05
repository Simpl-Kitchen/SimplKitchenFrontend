import AsyncStorage from "@react-native-async-storage/async-storage";


const storeToken = async (token) => {
    
    try {
        await AsyncStorage.setItem("userToken", token);
        
    } catch (error) {
        console.log(error);
    }
    
}

const removeToken = async () => {
    try {
        
        await AsyncStorage.removeItem("userToken");
    } catch (error) {
        console.log(error);
    }
}
module.exports = {storeToken, removeToken}