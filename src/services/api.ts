import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.4.109:3333'
})

// http://127.0.0.1:1900


export default api;