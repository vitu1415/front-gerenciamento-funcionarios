import { BrowserRouter, Route, Routes } from "react-router-dom";

import Tabela from "./components/Tabela/funcionariosLista";
import Forms from "./components/addFuncionairo/formsFuncionario";
import Home from "./components/home/home";
import Header from "./header/header";

function RouteApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/funcionario" element={ <Tabela/> } />
                <Route path="/funcionario/forms" element={ <Forms/> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp;