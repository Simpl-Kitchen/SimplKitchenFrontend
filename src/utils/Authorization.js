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

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        
        return token;
    } catch (error) {
        console.log(error);
    }
}
const isTokenExpired = (token) => {
    try {
        const [, payload] = token.split(".");
        const decodedPayload = JSON.parse(atob(payload));
        const expiration = decodedPayload.exp;

        if (!expiration) {
            console.log("Token has no expiration date")
            //return true;
        }
        const currentTime = new Date().getTime() / 1000;
        return currentTime > expiration;
    }
    catch {
        console.error('Error checking token expiration:', error)
        //return true;

    }
}


module.exports = {
    storeToken, 
    removeToken,
    getToken,}