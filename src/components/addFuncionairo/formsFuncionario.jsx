import "./forms.css";
import { useState, useEffect } from "react";

const FormsFuncionario = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    return (
        <div>
            {/* Botão para abrir o formulário */}
            <button onClick={openForm} className="open-form-button">
                Abrir Formulário
            </button>

            {/* Overlay e formulário (visível apenas quando isOpen é true) */}
            {isOpen && (
                <div className="overlay">
                    <div className="form-container">
                        <button className="close-button" onClick={closeForm}>
                            X
                        </button>
                        <h2>Formulário</h2>
                        <form>
                            <label htmlFor="name">Nome:</label>
                            <input type="text" id="name" placeholder="Digite seu nome" />
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormsFuncionario;