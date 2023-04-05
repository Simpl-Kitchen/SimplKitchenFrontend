import AsyncStorage from "@react-native-async-storage/async-storage";


const storeToken = async (token) => {
    await AsyncStorage.setItem("userToken", token);
}

module.exports = {storeToken}