import axios from "axios";
const { getUserInformation } = require("../../APICalls/SimplKitchen/user");
import { SPOONACULAR_API_KEY } from "@env";

const searchIngredientsByName = async (query) => {

    const userData = await getUserInformation();
    //console.log(userData)
    const intolerances = userData.userResponse.intolerances.toString();


    const opts = {
        'query': query.toLowerCase(), // String | The (natural language) search query.
        //'addChildren': true, // Boolean | Whether to add children of found foods.
        'metaInformation': true, // Boolean | Whether to return more meta information about the ingredients.
        'intolerances': intolerances, // String | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
        // 'sort': "calories", // String | The strategy to sort recipes by. See a full list of supported sorting options.
        'sortDirection': "asc", // String | The direction in which to sort. Must be either 'asc' (ascending) or 'desc' (descending).
        // 'offset': 56, // Number | The number of results to skip (between 0 and 900).
        'number': 10, // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
        // 'language': "en" // String | The language of the input. Either 'en' or 'de'.
    };

    const options = {
        method: 'GET',
        headers: {
            'x-api-key': SPOONACULAR_API_KEY
        },
        url: 'https://api.spoonacular.com/food/ingredients/search',
        params: opts,
    };

    const searchResults = axios.request(options).then(function (response) {
        //console.log(response.data)
        return response.data

    }).catch(function (error) {
        console.error('Error Message:', error.message); // Error message text
        console.error('Error Code:', error.response.status); // HTTP status code
        console.error('Error Response Data:', error.response.data); // Response data
        console.error('Error Request URL:', error.config.url);

    });

    return searchResults

}

// Tomorrow implement the following function:
// Search by ingredient

module.exports = { searchIngredientsByName };