import axios from "axios";
const { getToken } = require("../../AsyncStorage/userToken");
import { SIMPLKITCHEN_API_URL } from "@env";

const generateUserRecipes = async () => {
    console.log("Generating recipes...")
}

const getGeneratedRecipes = async () => {
    console.log("Getting generated recipes...")
}

module.exports = {
    generateUserRecipes,
    getGeneratedRecipes,
};