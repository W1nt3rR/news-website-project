import axios from "axios";

const newsAmmount = 10;

const newsAPItop = axios.create({
    baseURL: "https://newsapi.org/v2/top-headlines",
    params: {
        apiKey: "3603f9085251471c8e7e374b86b7322b",
        pageSize: newsAmmount
    }
});

const newsAPIevery = axios.create({
    baseURL: "https://newsapi.org/v2/everything",
    params: {
        apiKey: "3603f9085251471c8e7e374b86b7322b",
        pageSize: newsAmmount
    }
});

export { newsAPItop, newsAPIevery };