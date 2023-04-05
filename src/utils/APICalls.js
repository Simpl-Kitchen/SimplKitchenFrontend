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


module.exports = {loginSimplKitchen}