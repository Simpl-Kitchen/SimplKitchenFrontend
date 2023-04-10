import axios from "axios";
const { getToken } = require("./Authorization");

import { SIMPLKITCHEN_API_URL } from "@env";

console.log("SIMPLKITCHEN_API_URL: " + SIMPLKITCHEN_API_URL);

const loginSimplKitchen = async (email, password) => {
  console.log("Inside loginSimplKitchen");
  const response = await axios.post(`${SIMPLKITCHEN_API_URL}/auth/login`, {
    email: email,
    password: password,
  });
  return response;
};

const getIngredientsByName = async (queryObject) => {
  console.log("Inside getIngredientsByName");

  const userToken = await getToken();
  console.log("User token: " + JSON.stringify(userToken));

  const options = {
    method: "GET",
    url: `${SIMPLKITCHEN_API_URL}/search/ingredients`,
    params: queryObject,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await axios.request(options);
  const results = response.data.foodData.results;
  return results;
};

const addIngredientToPantry = async (ingredient) => {
  try {
    //console.log("Inside getIngredientsByName")

    const userToken = await getToken();
    console.log("User token: " + JSON.stringify(userToken));

    const options = {
      method: "POST",
      url: `${SIMPLKITCHEN_API_URL}/pantry`,
      //params: queryObject,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        ingredientId: ingredient.id,
        ingredientName: ingredient.name,
        pictureURL: ingredient.image,
      },
    };

    const response = await axios.request(options);
    console.log("Successfully added ingredient:", response.data);
  } catch (error) {
    console.error("Error adding ingredient to pantry:", error);
  }
};
const getUsersIngredients = async () => {
  try {
    const userToken = await getToken();

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

const getUser = async () => {
  try {
    const userToken = await getToken();

    const options = {
      method: "GET",
      url: `${SIMPLKITCHEN_API_URL}/user/profile`,
      //params: queryObject,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.request(options);
    //console.log("Successfully added ingredient:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}



module.exports = {
  loginSimplKitchen,
  getIngredientsByName,
  addIngredientToPantry,
  getUsersIngredients,
  removeIngredientFromPantry,
  updateIngredientAmount,
  getUser,
};
