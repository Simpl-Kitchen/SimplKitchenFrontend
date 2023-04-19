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
    try {
      const response = await axios.get(`${SIMPLKITCHEN_API_URL}/generated-recipes`);
      if (response.status === 200 && response.data) {
        console.log("Generated recipes data:", response.data);
        return response.data;
      } else {
        console.error("Failed to fetch generatedRecipes:", response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching generatedRecipes:", error);
      return null;
    }
  };
  

module.exports = {
    generateUserRecipes,
    getGeneratedRecipes,
};