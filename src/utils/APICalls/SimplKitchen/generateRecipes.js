import axios from "axios";
const { getToken } = require("../../AsyncStorage/userToken");
import { SIMPLKITCHEN_API_URL } from "@env";

const generateUserRecipes = async () => {
    
    console.log("Generating recipes...")
    const userToken = await getToken();
        console.log(userToken)

        const options = {
            method: "GET",
            url: `${SIMPLKITCHEN_API_URL}/generate/recipes`,
            //params: queryObject,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };

        const response = await axios.request(options);
        return response.data;
}

const getGeneratedRecipes = async () => {
    console.log("Getting generated recipes...")
}

module.exports = {
    generateUserRecipes,
    getGeneratedRecipes,
};