import './Tabela.css';
import React, { useState, useEffect } from 'react';
import { getAllFuncionario, getFuncionario, createFuncionairo, deleteFuncionario, patchFuncionario } from '../../api/funcionario';
import { useLocation } from 'react-router-dom';

const FuncionarioLista = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [edit, setEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState();

    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    const location = useLocation();
    const equipe = location.state?.equipe || JSON.parse(localStorage.getItem("equipeSelecionada"));

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await getAllFuncionario();
                console.log(response.data);
                // Certifique-se de que a resposta seja um array antes de setar
                if (Array.isArray(response.data)) {
                    setFuncionarios(response.data);
                } else {
                    setFuncionarios([]); // Caso não seja um array, set como array vazio
                }
            } catch (error) {
                console.error("Erro ao buscar os funcionários:", error);
                setFuncionarios([]); // Defina como vazio em caso de erro
            }
        };

        fetchFuncionarios();
    }, []); // Adicionando dependência vazia para rodar apenas uma vez

    const handleCreate = async (e) => {
        e.preventDefault();
        const funcionarioData = {
            nome,
            email,
            equipeId: equipe.id
        };
        try {
            if (!edit) {
                console.log("Funcionario: ", funcionarioData);
                await createFuncionairo(funcionarioData);
                window.location.reload();
            } else {
                console.log("esse é o funcionario: ", funcionarioData);
                await patchFuncionario(id, funcionarioData);
                window.location.reload();
            }
            closeForm();
        } catch (error) {
            if (error.details) {
                console.log(
                    "error",
                    `Erro: ${error.message}\nDetalhes: ${error.details}`
                );
            } else {
                console.log(
                    "error",
                    `Erro: ${"An unexpected error occurred. Please try again later."}`
                );
            }
            console.error("Error saving component:", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteFuncionario(id);
            console.log("Foi escluido")
            window.location.reload();
        } catch (error) {
        if (error.details) {
            console.log(
                "error",
                `Erro: ${error.message}\nDetalhes: ${error.details}`
            );
        } else {
            console.log(
                "error",
                `Erro: ${"An unexpected error occurred. Please try again later."}`
            );
        }
        console.error("Error saving component:", error);
    }
}

const editarFunc = async (id) => {
    setEdit(true);
    const response = await getFuncionario(id);
    setId(response.data.id);
    setNome(response.data.nome);
    setEmail(response.data.email);
    openForm();
}

return (
    <div>
        <h3>{equipe.nome}</h3>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Funções</th>
                </tr>
            </thead>
            <tbody>
                {funcionarios.filter(funcionario => funcionario.equipe.id === equipe.id).length === 0 ? (
                    <tr>
                        <td colSpan="2">Nenhum funcionário encontrado</td>
                    </tr>
                ) : (
                    funcionarios.filter(funcionario => funcionario.equipe.id === equipe.id).map((funcionario) => (
                        <tr key={funcionario.id}>
                            <td>{funcionario.nome}</td>
                            <td>{funcionario.email}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => editarFunc(funcionario.id)}
                                >
                                    ✏️
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(funcionario.id)}
                                >
                                    ❌
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
        <button className="open-form-button" onClick={openForm}>
            +
        </button>
        {isOpen && (
            <div className="overlay">
                <div className="form-container">
                    <h2>Adicionar Funcionario</h2>
                    <form className='form-adicionar'>
                        <div>
                            <label htmlFor="name">Nome:</label>
                            <input type="text" id="name" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='button-add'>
                            <button type="submit" onClick={handleCreate}>{edit ? "Salvar" : "Adicionar"}</button>
                            <button type="button" onClick={() => {closeForm(); setEdit(false); setEmail(); setNome();}}>cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
);
};

export default FuncionarioLista;