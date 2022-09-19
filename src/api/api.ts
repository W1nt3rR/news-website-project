import axios from "axios";

const commonParams = {
    apiKey: "3603f9085251471c8e7e374b86b7322b",
    pageSize: 12
}

export const newsAPItop = axios.create({
    baseURL: "https://newsapi.org/v2/top-headlines",
    params: commonParams
});

export const newsAPIsearch = axios.create({
    baseURL: "https://newsapi.org/v2/everything",
    params: commonParams
});