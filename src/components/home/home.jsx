import { Link } from "react-router-dom";
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createEquipe, deleteEquipe, getAllEquipes, getEquipe, patchEquipe } from "../../api/equipe";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState([]);
    const [id, setId] = useState();
    const [equipes,  setEquipes] = useState([]);
    const [edit, setEdit] = useState(false);
    const [searchQuery, setSearchQuery] = useState();

    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    const navigate = useNavigate();

    const activeButtonEquipe = () => {
        navigate('/funcionario');
    }

    useEffect(() => {
        const fetchEquipes = async () => {
            localStorage.removeItem("equipeSelecionada");
            try{
                const response = await getAllEquipes();
                if(Array.isArray(response.data)){
                    setEquipes(response.data);
                }
                else{
                    setEquipes([]);
                }
            } catch (error) {
                console.error("Erro ao buscar os euqipes:", error);
                setEquipes([]);
            }
        };
        fetchEquipes();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        const equipeData = {
            nome,
            descricao,
        };
        try{
            if(!edit){
                console.log(equipeData)
                await createEquipe(equipeData);
            } else {
                console.log("esse é a equipe: ", equipeData);
                await patchEquipe(id, equipeData);
            }

            
            setTimeout(() => {
                window.location.reload();
              }, 500);

            closeForm();
        } catch (error){
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
                await deleteEquipe(id);
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

    const editarEquipe = async (id) => {
        setEdit(true);
        const response = await getEquipe(id);
        setId(response.data.id);
        setNome(response.data.nome);
        setDescricao(response.data.descricao);
        openForm();
    }

    const filteredEquipes = searchQuery
    ? equipes.filter((equipe) =>
        equipe.nome.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : equipes;

    return (
        <div className="base-home">
            <div className="home">
                <div>
                    <input
                        type="text"
                        placeholder="Buscar equipe"
                        className="search-input"
                        value = {searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="lupa-pesquisa">🔎</button>
                </div>
                <button className="add-button" onClick={openForm}>
                    <h3>Adicionar Equipe</h3>
                </button>
                {isOpen && (
                    <div className="overlay">
                        <div className="form-container">
                            <h2>Adicionar Funcionario</h2>
                            <form className='form-adicionar'>
                                <div>
                                    <label htmlFor="nameEquipe">Nome Equipe:</label>
                                    <input type="text" id="nameEquipe" placeholder="Digite seu nome da equipe" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                </div>
                                <div>
                                    <label htmlFor="tec">Descricao</label>
                                    <input type="text" id="tec" placeholder='Digite a descricao' value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                                </div>
                                <div className='button-add'>
                                    <button type="submit" onClick={handleCreate}>{edit ? "Salvar" : "Adicionar"}</button>
                                    <button type="button" onClick={() => {closeForm(); setEdit(false); setDescricao(); setNome();}}>cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <div className="equipes">
                <div className="titulo-tabela-equipe">
                    <h1>Equipes</h1>
                </div>
                {filteredEquipes.length === 0 ? (
                    <h2 className="equipe-sem-nada">Nenhuma equipe cadastrada</h2>
                ) : (
                    filteredEquipes.map((equipes) => (
                        <div key={equipes.id}>
                            <button className="equipe-item" onClick={() => {localStorage.setItem("equipeSelecionada", JSON.stringify(equipes)); activeButtonEquipe();}}>
                                <Link className="equipe-link" to="/funcionario" onClick={() => localStorage.setItem("equipeSelecionada", JSON.stringify(equipes))} >{equipes.nome}</Link>
                            </button>
                            <div className="equipe-opcao">
                                <button onClick={() => editarEquipe(equipes.id)}>✏️</button>
                                <h1>|</h1>
                                <button onClick={() => handleDelete(equipes.id)}>❌</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;