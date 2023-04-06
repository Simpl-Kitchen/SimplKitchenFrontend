import axios from "axios";
const { getToken } = require("./Authorization");

const getUsersIngredients = async () => {
    try {
        const userToken = await getToken();

        const options = {
            method: "GET",
            url: "https://simplkitchenapi.onrender.com/api/v1/pantry",
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
}

const addIngredientToPantry = async (ingredient) => {

    try {
        //console.log("Inside getIngredientsByName")

        const userToken = await getToken();
        console.log("User token: " + JSON.stringify(userToken));

        const options = {
            method: "POST",
            url: "https://simplkitchenapi.onrender.com/api/v1/pantry",
            //params: queryObject,
            headers: {
                "Authorization": `Bearer ${userToken}`
            },
            data: {
                "ingredientId": ingredient.id,
                "ingredientName": ingredient.name,
                "pictureURL": ingredient.image,
            }

        };

        const response = await axios.request(options);
        console.log("Successfully added ingredient:", response.data);
    } catch (error) {
        console.error("Error adding ingredient to pantry:", error);
    }


}