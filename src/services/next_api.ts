import axios from "axios";

export const next_api = axios.create({
    baseURL: '/api'
})