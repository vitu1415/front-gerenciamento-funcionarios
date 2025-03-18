import axios from "axios"

const apiFunc = axios.create({
    baseURL: "https://back-gerenciamento-funcionario-production.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    }
});

apiFunc.interceptors.request.use((config) => {
    const userToken = localStorage.getItem("userToken");
    console.log("esse e o token: ", userToken)
    if (userToken) {
        config.headers["User-Token"] = userToken; // Adiciona o token no header, atravez da configuracao
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiFunc;