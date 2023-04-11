import { SIMPLKITCHEN_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { storeToken } from "../../AsyncStorage/userToken"

const loginSimplKitchen = async (email, password) => {

  const response = await axios.post(`${SIMPLKITCHEN_API_URL}/auth/login`, {
    email: email,
    password: password,
  });

  if (response) {
    await storeToken(response.data.token);
  }

  return response;
};

const registerSimplKitchen = async (name, username, email, password) => {

  const options = {
    method: "POST",
    url: "https://simplkitchenapi.onrender.com/api/v1/auth/register",
    data: {
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      username: username,
      email: email,
      password: password,
    },
  };

  const response = await axios.request(options);

  if (response) {

    await storeToken(response.data.token);
  }

  return response.data;
}

const getUserInformation = async () => {
  console.log("Hello")
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken)
    const options = {
      method: "GET",
      url: `${SIMPLKITCHEN_API_URL}/user/profile`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.request(options);
    //console.log("Successfully added ingredient:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports =
{

  loginSimplKitchen,
  registerSimplKitchen,
  getUserInformation
}
