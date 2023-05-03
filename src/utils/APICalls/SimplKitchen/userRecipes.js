import axios from "axios";
const { getToken } = require("../../AsyncStorage/userToken");
import { SIMPLKITCHEN_API_URL } from "@env";


// Use add recipes for the save button on the generate recipe page
const addRecipe = async (recipe) => {
    try {

        const userToken = await getToken();

        console.log("User token: " + JSON.stringify(userToken));

        const options = {
            method: "POST",
            url: `${SIMPLKITCHEN_API_URL}/pantry/recipe`,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            data: recipe,
        };

        const response = await axios.request(options);
        console.log("Successfully added recipe:", response.data);
    } catch (error) {
        console.error("Error adding recipe to pantry:", error);
    }
}
// Use get recipes on the user recipe page
const getRecipes = async () => {
    try {

        const userToken = await getToken();

        console.log("User token: " + JSON.stringify(userToken));

        const options = {
            method: "GET",
            url: `${SIMPLKITCHEN_API_URL}/pantry/recipe`,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            data: recipe,
        };

        const response = await axios.request(options);
        console.log("Successfully added recipe:", response.data);
    } catch (error) {
        console.error("Error adding recipe to pantry:", error);
    }
}
// Use delete recipe on the user recipe page to remove a recipe
const deleteRecipe = async (recipe) => {
    id = recipe._id
    try {

        const userToken = await getToken();

        console.log("User token: " + JSON.stringify(userToken));

        const options = {
            method: "DELETE",
            url: `${SIMPLKITCHEN_API_URL}/pantry/recipe/${id}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };

        const response = await axios.request(options);
        console.log("Successfully added recipe:", response.data);
    } catch (error) {
        console.error("Error adding recipe to pantry:", error);
    }
}

module.exports = {
    addRecipe,
    getRecipes,
    deleteRecipe,
}