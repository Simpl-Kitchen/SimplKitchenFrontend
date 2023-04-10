import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const {getUser} = require("./APICalls.js")

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

module.exports(connectUserToSpoonacular)
