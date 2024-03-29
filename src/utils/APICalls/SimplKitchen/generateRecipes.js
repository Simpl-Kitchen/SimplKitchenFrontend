import axios from "axios";
const { getToken } = require("../../AsyncStorage/userToken");
import { SIMPLKITCHEN_API_URL } from "@env";

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