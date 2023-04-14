import axios from "axios";
const { getUserInformation } = require("../SimplKitchen/user");
import { SPOONACULAR_API_KEY } from "@env";

const connectUserToSpoonacular = async () => {

    const userData = await getUserInformation();
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

const generateMealPlanWeek = async () => {
    const options = {
        method: "GET",
        url: "https://api.spoonacular.com/mealplanner/generate",
        headers: {
            'x-api-key': SPOONACULAR_API_KEY
        },
        params: {
            timeFrame: "week",
        }

    }

    const response = await axios.request(options);
    const mealPlanWeek = response.data

    return mealPlanWeek
}

module.exports = {
    connectUserToSpoonacular,
    generateMealPlanWeek
}