import axios from "axios";
const BASE_URL = "https://icanhazdadjoke.com";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
    },
});
