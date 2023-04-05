import axios from "axios";

const loginSimplKitchen = async (email, password) => {
    console.log("Inside loginSimplKitchen")
    const response = await axios.post(
        "https://simplkitchenapi.onrender.com/api/v1/auth/login",
        {
        email: email,
        password: password,
        }
    );
    return response;
};

const getIngredientsByName = async (queryObject) => {
    console.log("Inside getIngredientsByName")
    const options = {
        method: "GET",
        url: "https://simplkitchenapi.onrender.com/api/v1/search/ingredients",
        params: queryObject,
      };

      const response = await axios.request(options);
      const results = response.data.foodData.results;
      return results;
}


module.exports = {loginSimplKitchen, getIngredientsByName}