import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const {getUser} = require("./APICalls")

const connectUserToSpoonacular = async () => {

    const userData = await getUser();
    const username = userData.username
    const firstname = userData.firstName
    const lastname = userData.lastName
    const email = userData.email

    try {
        const options = {
          method: "POST",
          url: "https://api.spoonacular.com/users/connect",
          data: {
            username: username,
            firstName: firstname,
            lastName: lastname,
            email: email,
          },
        };
    
        const response = await axios.request(options);
        console.log(response)
        //console.log("Successfully added ingredient:", response.data);
      } catch (error) {
        console.error(error);
      }
}

const loginSimplKitchen = async (email, password) => {
  console.log("Inside loginSimplKitchen");
  const response = await axios.post(`${SIMPLKITCHEN_API_URL}/auth/login`, {
    email: email,
    password: password,
  });
  return response;
};

const registerSimplKitchen = async (username, name, email, password) => {
  axios
      .post("https://simplkitchenapi.onrender.com/api/v1/auth/register", {
        username : username,
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;
        console.log(token);
        if (response.data === "Email already exists") {
          Alert.alert("Email already exists");
        } else {
          Alert.alert("Registration successful");
          props.navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error registering user");
      });
}

module.exports(connectUserToSpoonacular, loginSimplKitchen, registerSimplKitchen)
