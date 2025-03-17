import axios from "axios"

const apiFunc = axios.create({
    baseURL: "back-gerenciamento-funcionario-production.up.railway.app",
});

export default apiFunc;