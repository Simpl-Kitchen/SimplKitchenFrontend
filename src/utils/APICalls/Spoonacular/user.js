import axios from "axios";
const { getUserInformation } = require("../SimplKitchen/user");
import { SPOONACULAR_API_KEY } from "@env";
const BASE_URL = "https://api.spoonacular.com";
import pLimit from 'p-limit';

export const connectUserToSpoonacular = async () => {
  const userData = await getUserInformation();
  const username = userData.username;
  const firstname = userData.firstName;
  const lastname = userData.lastName;
  const email = userData.email;

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
    console.log(response);
    //console.log("Successfully added ingredient:", response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeInformation = async (recipeId) => {
    const limit = pLimit(1); // limit to 5 requests per second
    const options = {
      method: "GET",
      url: `${BASE_URL}/recipes/${recipeId}/information`,
      headers: {
        "x-api-key": SPOONACULAR_API_KEY,
      },
    };
    try {
      const response = await limit(() => axios(options)); // limit the request with p-limit
      return response.data;
    } catch (error) {
      console.error("Error fetching recipe information: ", error);
      throw error;
    }
  };

export const generateMealPlanWeek = async () => {
  const options = {
    method: "GET",
    url: "https://api.spoonacular.com/mealplanner/generate",
    headers: {
      "x-api-key": SPOONACULAR_API_KEY,
    },
    params: {
      timeFrame: "week",
    },
  };

  const response = await axios.request(options);
  const mealPlanWeek = response.data;

  return mealPlanWeek;
};
