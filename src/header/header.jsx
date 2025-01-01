import "./style.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="title-link">
                <h1 className="title">List's Funcionários</h1>
            </Link>
            <button className="user-button">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOOCu0fNtHOvzlPURGlqD1K_fwBNbWkRxDGw&s" 
                    alt="User Avatar" 
                    className="avatar" 
                />
            </button>
        </div>
    );
}

export default Header;
