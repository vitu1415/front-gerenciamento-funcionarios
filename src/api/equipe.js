import apiFunc from "../service/apiFunc"


export const getAllEquipes = async() => {
    try{
        const response = apiFunc.get("/equipes");
        return response;
    }catch (error){
        console.error("Error fetching equipe: ", error);
        throw error;
    }
}

export const getEquipe = async(userId) => {
    try{
        const response = apiFunc.get(`/equipes/${userId}`);
        return response;
    } catch (error){
        console.error("Error fetching equipe: ", error);
        throw error;
    }
}

export const createEquipe = async(userData) => {
    try{
        const response = apiFunc.post(`/equipes`, userData);
        return response.data;
    } catch (error){
        console.error("Error creating equipe: ", error);
        throw error;
    }
}

export const deleteEquipe = async (userId) => {
    try {
      const response = await apiFunc.delete(`/equipes/${userId}`);
      console.log("deletado com sucesso")
    } catch (error) {
      console.error("Erro ao atualizar equipe: ", error.message);
      throw error;
    }
}

export const patchEquipe = async (userId, userData) => {
    try {
      const response = await apiFunc.put(`/equipes/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar equipe: ", error.message);
      throw error;
    }
}