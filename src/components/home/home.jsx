import { Link } from "react-router-dom";
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { use } from "react";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [nomeEquipe, setNomeEquipe] = useState();
    const [tecnologias, setTecnologias] = useState([]);

    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    const navigate = useNavigate();

    const activeButtonEquipe = () => {
        navigate('/funcionario');
    }

    return (
        <div className="base-home">
            <div className="home">
                <input
                    type="text"
                    placeholder="Buscar equipe"
                    className="search-input"
                />
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
                                    <input type="text" id="nameEquipe" placeholder="Digite seu nome da equipe" value={nomeEquipe} onChange={(e) => setNomeEquipe(e.target.value)} required />
                                </div>
                                <div>
                                    <label htmlFor="tec">Tecnologias</label>
                                    <input type="text" id="tec" placeholder='Digite a tecnologia' value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} required />
                                </div>
                                <div className='button-add'>
                                    <button type="submit" onClick={closeForm}>Adicionar</button>
                                    <button type="button" onClick={closeForm}>cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <div className="equipes">
                <button className="equipe-item" onClick={activeButtonEquipe}>
                    <Link className="equipe-link" to="/funcionario">teste</Link>
                </button>
                <button className="equipe-item" onClick={activeButtonEquipe}>
                    <Link className="equipe-link" to="/funcionario">teste</Link>
                </button>
                <button className="equipe-item" onClick={activeButtonEquipe}>
                    <Link className="equipe-link" to="/funcionario">teste</Link>
                </button>
                <button className="equipe-item" onClick={activeButtonEquipe}>
                    <Link className="equipe-link" to="/funcionario">teste</Link>
                </button>
                <button className="equipe-item" onClick={activeButtonEquipe}>
                    <Link className="equipe-link" to="/funcionario">teste</Link>
                </button>
                <button className="equipe-item" onClick={activeButtonEquipe}>
                    <Link className="equipe-link" to="/funcionario">teste</Link>
                </button>
                <button className="equipe-item" onClick={activeButtonEquipe}>
                    <Link className="equipe-link" to="/funcionario">teste</Link>
                </button>
            </div>
        </div>
    );
}

export default Home;
