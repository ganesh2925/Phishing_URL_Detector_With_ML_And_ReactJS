import axios from 'axios';

const baseURL = "https://phishing-detector-4786.onrender.com/"

const app = axios.create({
    baseURL,
    withCredentials: true
})

export default app;