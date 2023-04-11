import axios from "axios";

const searchIngredientsByName = async (query) => {
    options = {
        'query': query, // String | The (natural language) search query.
        'addChildren': true, // Boolean | Whether to add children of found foods.
        // 'metaInformation': false, // Boolean | Whether to return more meta information about the ingredients.
        // 'intolerances': "egg", // String | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
        'intolerances': queryObject.intolerances, // String | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
        // 'sort': "calories", // String | The strategy to sort recipes by. See a full list of supported sorting options.
        'sortDirection': "asc", // String | The direction in which to sort. Must be either 'asc' (ascending) or 'desc' (descending).
        // 'offset': 56, // Number | The number of results to skip (between 0 and 900).
        'number': 10, // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
        // 'language': "en" // String | The language of the input. Either 'en' or 'de'.
    };


}

module.exports = { searchIngredientsByName };