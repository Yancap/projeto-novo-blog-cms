import axios from "axios";

export const cms_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})