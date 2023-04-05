import AsyncStorage from "@react-native-async-storage/async-storage";


const storeToken = async (token) => {
    await AsyncStorage.setItem("userToken", token);
}

const removeToken = async () => {
    await AsyncStorage.removeItem("userToken");
}
module.exports = {storeToken, removeToken}