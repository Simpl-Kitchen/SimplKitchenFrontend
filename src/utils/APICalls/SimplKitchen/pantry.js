import axios from "axios";
const { getToken } = require("../../AsyncStorage/userToken");
import { SIMPLKITCHEN_API_URL } from "@env";

const getUsersIngredients = async () => {
    try {
        const userToken = await getToken();
        console.log(userToken)

        const options = {
            method: "GET",
            url: `${SIMPLKITCHEN_API_URL}/pantry`,
            //params: queryObject,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };

        const response = await axios.request(options);
        //console.log("Successfully added ingredient:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting all ingredients:", error);
    }
};

const addIngredientToPantry = async (ingredient) => {
    try {

        const userToken = await getToken();

        console.log("User token: " + JSON.stringify(userToken));

        const options = {
            method: "POST",
            url: `${SIMPLKITCHEN_API_URL}/pantry`,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            data: {
                ingredientId: ingredient.id,
                ingredientName: ingredient.name,
                pictureURL: ingredient.image,
                amount: ingredient.amount,
                unit: ingredient.unit,
                // THIS MIGHT NOT WORK YET
            },
        };

        const response = await axios.request(options);
        console.log("Successfully added ingredient:", response.data);
    } catch (error) {
        console.error("Error adding ingredient to pantry:", error);
    }
};

const removeIngredientFromPantry = async (ingredient) => {

    console.log("Inside removeIngredientFromPantry")
    console.log("Ingredient ID: " + JSON.stringify(ingredient.ingredientId))
    try {
        const userToken = await getToken();

        const options = {
            method: "DELETE",
            url: `${SIMPLKITCHEN_API_URL}/pantry/${ingredient.ingredientId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        };

        console.log(options.url)
        const response = await axios.request(options);
        console.log("Successfully removed ingredient:", response.data);
    } catch (error) {
        console.error("Error removing ingredient from pantry:", error);
    }

};

const updateIngredientAmount = async (ingredient) => {

    console.log("Updating ingredient amount")
    console.log("Ingredient ID: " + JSON.stringify(ingredient.ingredientId))
    console.log("Ingredient amount: " + JSON.stringify(ingredient.amount))

    try {
        const userToken = await getToken();

        const options = {
            method: "PATCH",
            url: `${SIMPLKITCHEN_API_URL}/pantry/${ingredient.ingredientId}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            data: {
                amount: ingredient.amount,
            },
        };

        //console.log(options.url)
        const response = await axios.request(options);
        console.log("Successfully updated ingredient:", response.data);

    } catch (error) {
        console.error("Error updating ingredient amount:", error);

    }
}

const addRecipeToPantry = async (recipe) => {
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


module.exports = {
    addIngredientToPantry,
    getUsersIngredients,
    removeIngredientFromPantry,
    updateIngredientAmount,
    addRecipeToPantry,
}