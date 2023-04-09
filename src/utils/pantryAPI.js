import axios from "axios";

const API_URL = "your_api_url_here";

export const getUsersIngredients = async () => {
  const response = await axios.get(`${API_URL}/pantry`);
  return response.data;
};

export const addIngredientToPantry = async (ingredient) => {
  await axios.post(`${API_URL}/pantry`, ingredient);
};

export const removeIngredientFromPantry = async (ingredient) => {
  await axios.delete(`${API_URL}/pantry/${ingredient.id}`);
};
