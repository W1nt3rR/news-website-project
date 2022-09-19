import axios from "axios";

const commonParams = {
    apiKey: "3603f9085251471c8e7e374b86b7322b",
    pageSize: 12
}

const newsAPItop = axios.create({
    baseURL: "https://newsapi.org/v2/top-headlines",
    params: commonParams
});

const newsAPIevery = axios.create({
    baseURL: "https://newsapi.org/v2/everything",
    params: commonParams
});

export { newsAPItop, newsAPIevery };