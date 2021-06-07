import axios from "axios";

const api = axios.create({
    baseURL: "https://desafio-afya.herokuapp.com/"
 
})

export default api;