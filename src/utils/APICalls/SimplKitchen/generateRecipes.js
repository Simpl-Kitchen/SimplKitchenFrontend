import axios from "axios";
const { getToken } = require("../../AsyncStorage/userToken");
import { SIMPLKITCHEN_API_URL } from "@env";



    //function called generateUserRecipes. 
    //It first logs a message saying "Generating recipes…" to the console. 
    //Next, it awaits a call to the getToken() function, which presumably returns an authentication token for the user. 
    //It then creates an options object with the HTTP method, URL, and headers needed to make a request to a recipe API endpoint. 
    //Finally, it sends the request using axios and returns the response data.
const generateUserRecipes = async () => {
    
    console.log("Generating recipes...")
    const userToken = await getToken();
        console.log(userToken)

        const options = {
            method: "GET",
            url: `${SIMPLKITCHEN_API_URL}/queue/recipes/new`,
            //params: queryObject,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };

        const response = await axios.request(options);
        //console.log(response.data)
        return response.data;
}


    // function called getGeneratedRecipes that retrieves generated recipes from an API.
    // It first logs a message to the console, then retrieves an authorization token using the getToken function. 
    //Next, it creates an options object with the HTTP method, URL, and headers required to make a GET request to the API endpoint. 
    //Finally, it makes the request using the axios library and returns the response data.
const getGeneratedRecipes = async () => {
    
    console.log("Getting generated recipes...");
    const userToken = await getToken();

    const options = {
        method: "GET",
        url: `${SIMPLKITCHEN_API_URL}/queue/recipes/`,
        //params: queryObject,
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };

    const response = await axios.request(options);
    return response.data;

  };
  

module.exports = {
    generateUserRecipes,
    getGeneratedRecipes,
};