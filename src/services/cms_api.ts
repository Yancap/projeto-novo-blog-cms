import axios from "axios";

export const cms_api = axios.create({
    baseURL: "http://localhost:3333/cms"
})