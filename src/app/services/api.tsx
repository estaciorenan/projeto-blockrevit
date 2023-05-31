import axios from "axios";


export const api = axios.create({
    baseURL: 'https://test-candidaturas-front-end.onrender.com/'
})