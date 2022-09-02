import axios from "axios";

const newsAPI = axios.create({
    baseURL: "https://newsapi.org/v2",
    params: {
        apiKey: "3603f9085251471c8e7e374b86b7322b"
    }
});

export { newsAPI };