import apiFunc from "../service/apiFunc";

export const getAllFuncionario = async () => {
  try {
    const response = await apiFunc.get(
      "/funcionario"
    );
    return response;
  } catch (error) {
    console.error("Error fetching funcionario:", error);
    throw error;
  }
}

export const getFuncionario = async (userId) => {
  try {
    const response = await apiFunc.get(`/funcionario/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching funcionario:", error);
    throw error;
  }
}

export const createFuncionairo = async (userData) => {
  try {
    const response = await apiFunc.post("/funcionario", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating funcionario:", error);
    throw error;
  }
};

export const deleteFuncionario = async (userId) => {
  try {
    const response = await apiFunc.delete(`/funcionario/${userId}`);
    console.log("deletado com sucesso")
  } catch (error) {
    console.error("Erro ao atualizar funcionario:", error.message);
    throw error;
  }
}

export const patchFuncionario = async (userId, userData) => {
  try {
    const response = await apiFunc.put(`/funcionario/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar funcionario:", error.message);
    throw error;
  }
}